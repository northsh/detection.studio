// @ts-ignore - Pyodide will be loaded from CDN
import {loadPyodide, PyodideInterface} from 'pyodide';
import {SIGMA_TARGETS} from '@/types/SIEMs';
import registerPromiseWorker from "promise-worker/register";
// Import SQLite separately for better compatibility in worker environments
import {init as initSQLite, SQLiteWorker} from 'sqlite-worker';

// Runtime state
let pyodide: PyodideInterface | null = null;
let installedBackends = new Set<string>();
let pythonModuleLoaded = false;
let sigmaNamespace = null;
let sqliteDB: any = null;
let logData: any[] = [];
let searchResults: { matches: any[], stats: any } = {matches: [], stats: {totalMatches: 0, totalRecords: 0}};

// Initialize Pyodide in the background
const pyodideReadyPromise = (async () => {
    try {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/"
        });

        await pyodide?.loadPackage("micropip");
        const micropip = pyodide?.pyimport("micropip");

        // Install sigma-cli
        await micropip.install('https://files.pythonhosted.org/packages/51/4e/f9139956ecd088b21aecddbdf5a69fcd737578856704dbfc6965a5c8acdb/pysigma-0.11.22-py3-none-any.whl');

        // Install SQLite backend
        await micropip.install('pysigma-backend-sqlite');

        return pyodide;
    } catch (error) {
        console.error('Error initializing Pyodide:', error);
        throw error;
    }
})();

// Initialize SQLite database with direct initialization
const initSQLiteDB = async () => {
    // Return existing instance if available
    if (sqliteDB) return sqliteDB;


    console.log('Initializing SQLite database...');

    try {
        // Try direct initialization for web workers
        console.log('Using direct initialization...');
        sqliteDB = await initSQLite({
            name: 'sigma-logs-db',
            database: new Uint8Array(0),
            timeout: 5000  // Longer timeout for reliability
        });

        console.log('SQLite database initialized successfully!');

        // Create logs table - simpler schema to avoid issues
        try {
            await sqliteDB.query`CREATE TABLE IF NOT EXISTS logs
                                 (
                                     id
                                     INTEGER
                                     PRIMARY
                                     KEY,
                                     data
                                     TEXT
                                 )`;
            console.log('Logs table created successfully!');
        } catch (tableError) {
            console.error('Error creating table:', tableError);
        }

        return sqliteDB;
    } catch (error) {
        console.error('Error initializing SQLite database:', error);
        console.error('Error details:', String(error));

        // Fallback to worker mode as last resort
        try {
            console.log('Trying worker-based initialization as fallback...');
            sqliteDB = await SQLiteWorker({
                name: 'sigma-logs-db-fallback',
                database: new Uint8Array(0),
                timeout: 5000
            });

            console.log('Fallback SQLite database initialized successfully!');

            // Create logs table
            await sqliteDB.query`CREATE TABLE IF NOT EXISTS logs
                                 (
                                     id
                                     INTEGER
                                     PRIMARY
                                     KEY,
                                     data
                                     TEXT
                                 )`;

            return sqliteDB;
        } catch (fallbackError) {
            console.error('Even fallback initialization failed:', fallbackError);
            throw new Error(`SQLite initialization failed: ${error}. Fallback also failed: ${fallbackError}`);
        }
    }
};

/**
 * Load the Python sigma converter module
 */
async function loadPythonModule() {
    try {
        // Import the Python module using Vite's dynamic import
        const sigmaConverterModule = await import('/src/lib/sigma/python/sigma_converter.py?raw');
        const pythonCode = sigmaConverterModule.default;

        // Create a namespace for our Python module
        sigmaNamespace = pyodide?.globals.get("dict")();

        // Run the module code to define the functions in our namespace
        pyodide?.runPython(pythonCode, {globals: sigmaNamespace});
        pythonModuleLoaded = true;

        return true;
    } catch (error) {
        console.error('Error loading Python module:', error);
        return false;
    }
}

/**
 * Install a backend for a specific target
 */
async function installBackend(target: string) {
    if (installedBackends.has(target)) {
        return {success: true};
    }

    const targetInfo = SIGMA_TARGETS.get(target);
    if (!targetInfo?.backend) {
        throw new Error(`No backend URL found for target ${target}`);
    }

    const micropip = pyodide?.pyimport("micropip");
    await micropip.install(targetInfo.backend);
    installedBackends.add(target);

    // Reset the Python module loaded flag to reload the module
    pythonModuleLoaded = false;
    await loadPythonModule();

    return {success: true};
}

/**
 * Convert a Sigma rule to a target query format
 */
interface ConvertOptions {
    rule: string;
    target: string;
    pipelines?: string[];
    pipelineYmls?: string[];
    filterYml?: string;
    format?: string;
    correlationMethod?: string;
    backendOptions?: Record<string, any>;
    skipUnsupported?: boolean;
}

async function convertRule({
                               rule,
                               target,
                               pipelines = [],
                               pipelineYmls = [],
                               filterYml = '',
                               format = "default",
                               correlationMethod = '',
                               backendOptions = {},
                               skipUnsupported = false
                           }: ConvertOptions) {
    if (!installedBackends.has(target)) {
        await installBackend(target);
    }

    if (!pythonModuleLoaded) {
        await loadPythonModule();
    }

    // Create a namespace with parameters directly
    const params = {
        rule,
        target,
        pipeline_names: pipelines || null,
        pipeline_ymls: pipelineYmls || null,
        filter_yml: filterYml || null,
        format,
        correlation_method: correlationMethod || null,
        backend_options: backendOptions || null,
        skip_unsupported: skipUnsupported
    };

    // Set parameters in namespace using toPy
    const convertParams = pyodide?.toPy(params);

    // Extend our namespace with these parameters
    sigmaNamespace?.update(convertParams);

    // Run the Python code that uses the parameters from the namespace
    const pythonCode = `
    convert_rule(
      rule,
      target,
      pipeline_names=pipeline_names,
      pipeline_ymls=pipeline_ymls,
      filter_yml=filter_yml,
      correlation_method=correlation_method,
      backend_options=backend_options,
      skip_unsupported=skip_unsupported
    )
  `;

    const result = pyodide?.runPython(pythonCode, {globals: sigmaNamespace});
    return {result: result};
}

// Register promise worker handler
/**
 * Load JSON log data into SQLite
 */
async function loadLogData(jsonData: string) {
    try {
        console.log('Starting to load log data...');

        // Initialize SQLite DB if needed
        console.log('Initializing SQLite DB...');
        await initSQLiteDB();

        // Clear existing data
        console.log('Clearing existing data...');
        await sqliteDB.query`DELETE
                             FROM logs`;

        // Parse the JSON data
        console.log('Parsing JSON data...');
        let logs: any[];
        try {
            logs = JSON.parse(jsonData);
            // Handle single object vs array of objects
            if (!Array.isArray(logs)) {
                if (typeof logs === 'object') {
                    logs = [logs];
                    console.log('Converted single object to array');
                } else {
                    throw new Error('Invalid JSON format');
                }
            }
            console.log(`Successfully parsed JSON data: ${logs.length} records`);
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            return {success: false, error: 'Failed to parse JSON data'};
        }

        // Store the parsed data for reference
        logData = logs;

        // Insert records in smaller batches to avoid potential issues
        console.log('Inserting data into SQLite...');
        const BATCH_SIZE = 100;
        const totalBatches = Math.ceil(logs.length / BATCH_SIZE);

        for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
            const batchStart = batchIndex * BATCH_SIZE;
            const batchEnd = Math.min((batchIndex + 1) * BATCH_SIZE, logs.length);
            const batchItems = logs.slice(batchStart, batchEnd);

            console.log(`Processing batch ${batchIndex + 1}/${totalBatches}, items ${batchStart}-${batchEnd - 1}`);

            // Use individual inserts instead of transaction for better error handling
            for (let i = 0; i < batchItems.length; i++) {
                const log = batchItems[i];
                try {
                    // Store as JSON string
                    const jsonStr = JSON.stringify(log);
                    await sqliteDB.query`INSERT INTO logs (data)
                                         VALUES (${jsonStr})`;
                } catch (insertError) {
                    console.error(`Error inserting item ${batchStart + i}:`, insertError);
                    // Continue with next item
                }
            }
        }

        console.log(`Successfully loaded ${logs.length} records into SQLite`);
        return {success: true, count: logs.length};
    } catch (error) {
        console.error('Error loading log data:', error);
        // More detailed error information
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        return {success: false, error: String(error)};
    }
}

/**
 * Execute a search query against loaded log data
 */
async function searchLogs(sqlQuery: string) {
    try {
        console.log('Starting search operation...');

        // Initialize SQLite DB if needed
        console.log('Ensuring SQLite DB is ready...');
        await initSQLiteDB();

        // Replace <TABLE_NAME> with logs
        console.log('Original SQL query:', sqlQuery);
        const finalQuery = sqlQuery.replace(/<TABLE_NAME>/g, 'logs');
        console.log('Modified SQL query:', finalQuery);

        // Check if the logs table exists and has data
        const tableCheck = await sqliteDB.get`
            SELECT count(*) as count
            FROM sqlite_master
            WHERE type ='table' AND name ='logs'
        `;

        if (!tableCheck || tableCheck.count === 0) {
            console.error('Logs table does not exist');
            return {
                matches: [],
                stats: {totalMatches: 0, totalRecords: logData.length || 0},
                error: 'Logs table does not exist'
            };
        }

        const countCheck = await sqliteDB.get`SELECT count(*) as count
                                              FROM logs`;
        console.log(`Logs table contains ${countCheck.count} records`);

        if (countCheck.count === 0) {
            console.log('No records in logs table to search');
            return {
                matches: [],
                stats: {totalMatches: 0, totalRecords: 0},
                error: null
            };
        }

        // Execute the query
        console.log('Executing SQL query...');
        let results;
        try {
            results = await sqliteDB.all(sqliteDB.raw`${finalQuery}`);
            console.log(`Query executed successfully, returned ${results.length} results`);
        } catch (queryError) {
            console.error('Error executing query:', queryError);
            // Try a simpler query to test if SQLite is working
            try {
                const testResults = await sqliteDB.all`SELECT *
                                                       FROM logs LIMIT 1`;
                console.log('Test query executed successfully:', testResults);
                return {
                    matches: [],
                    stats: {totalMatches: 0, totalRecords: logData.length || 0},
                    error: `Query error: ${queryError}. SQLite is working but the query syntax may be incorrect.`
                };
            } catch (testError) {
                console.error('Even test query failed:', testError);
                return {
                    matches: [],
                    stats: {totalMatches: 0, totalRecords: logData.length || 0},
                    error: `SQLite database access error: ${testError}`
                };
            }
        }

        // Format results and calculate stats
        console.log('Formatting results...');
        const matches = results.map((row: any) => {
            // If row.data is a string, parse it
            let data = row.data;
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.warn('Failed to parse JSON from database:', e);
                }
            }
            return data;
        });

        searchResults = {
            matches,
            stats: {
                totalMatches: matches.length,
                totalRecords: logData.length || 0
            }
        };

        console.log(`Search completed with ${matches.length} matches from ${logData.length} total records`);
        return searchResults;
    } catch (error) {
        console.error('Error searching logs:', error);
        // More detailed error information
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        return {
            matches: [],
            stats: {totalMatches: 0, totalRecords: logData.length || 0},
            error: String(error)
        };
    }
}

registerPromiseWorker(async (message) => {
    try {
        // Wait for Pyodide to be ready before processing any message
        await pyodideReadyPromise;
        console.log(`Worker: Processing message of type '${message.type}'`);

        const {type} = message;

        switch (type) {
            case 'convert':
                return await convertRule({
                    rule: message.rule,
                    target: message.target,
                    pipelines: message.pipelines,
                    pipelineYmls: message.pipelineYmls,
                    filterYml: message.filterYml,
                    format: message.format,
                    correlationMethod: message.correlationMethod,
                    backendOptions: message.backendOptions,
                    skipUnsupported: message.skipUnsupported
                });
            case 'install':
                return await installBackend(message.target);
            case 'status':
                // Don't initialize SQLite during status check - this causes a loop
                // Just report the current state
                return {
                    ready: true,
                    sqliteReady: !!sqliteDB,
                    pyodideReady: true
                };
            case 'loadData':
                // Explicitly check if data is provided
                if (!message.data) {
                    return {
                        success: false,
                        error: 'No data provided'
                    };
                }

                // Ensure SQLite is initialized before loading data
                if (!sqliteDB) {
                    try {
                        await initSQLiteDB();
                    } catch (initError) {
                        return {
                            success: false,
                            error: `Failed to initialize SQLite database: ${initError}`
                        };
                    }
                }

                return await loadLogData(message.data);
            case 'search':
                if (!message.query) {
                    return {
                        matches: [],
                        stats: {totalMatches: 0, totalRecords: logData.length || 0},
                        error: 'No query provided'
                    };
                }

                // Ensure SQLite is initialized before searching
                if (!sqliteDB) {
                    try {
                        await initSQLiteDB();
                    } catch (initError) {
                        return {
                            matches: [],
                            stats: {totalMatches: 0, totalRecords: logData.length || 0},
                            error: `Failed to initialize SQLite database: ${initError}`
                        };
                    }
                }

                return await searchLogs(message.query);
            default:
                throw new Error(`Unknown message type: ${type}`);
        }
    } catch (error) {
        console.error(`Worker: Unhandled error processing message:`, error);
        // Return a structured error response
        return {
            error: error instanceof Error ? error.message : String(error),
            name: error instanceof Error ? error.name : 'UnknownError',
            success: false,
            // Include type information to assist with debugging
            messageType: message?.type
        };
    }
});
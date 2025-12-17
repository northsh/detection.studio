import splunk_svg from "@/images/splunk.svg";
import elasticsearch_svg from "@/images/elasticsearch.svg";
import loki_svg from "@/images/grafana.svg";
import quickwit from "@/images/quickwit.svg";
import kql from "@/images/kql.svg";
import secops from "@/images/secops.svg";
import crowdstrike from "@/images/crowdstrike.svg";
import panther from "@/images/panther.svg";
import sqlite from "@/images/sqlite.svg";
import opensearch from "@/images/opensearch.svg";


export type Siem = {
    id: string;
    name: string;
    icon: string | null;
    company?: string;
    colorClass?: string;
    backend?: string;
    correlation?: boolean;
};

export type SigmaTarget = {
    id: string;
    title: string;
    backend?: string;
};

/**
 * Single array of all supported SIEMs with their details
 */
export const supportedSiems: Array<Siem> = [
    {
        id: "splunk",
        name: "Splunk",
        icon: splunk_svg,
        company: "Splunk",
        colorClass: "text-[#74B036]!",
        backend: "pysigma-backend-splunk",
        correlation: true,
    },
    {
        id: "esql",
        name: "ES | QL",
        icon: elasticsearch_svg,
        company: "Elasticsearch",
        colorClass: "text-[#23BBB1]!",
        backend: "pysigma-backend-elasticsearch",
        correlation: true,
    },
    {
        id: "lucene",
        name: "Lucene",
        icon: elasticsearch_svg,
        company: "Elasticsearch",
        colorClass: "text-[#23BBB1]!",
        backend: "pysigma-backend-elasticsearch",
    },
    {
        id: "eql",
        name: "EQL",
        icon: elasticsearch_svg,
        company: "Elasticsearch",
        colorClass: "text-[#23BBB1]!",
        backend: "pysigma-backend-elasticsearch",
    },
    {
        id: "loki",
        name: "Loki",
        icon: loki_svg,
        company: "Grafana",
        colorClass: "text-[#F49D2A]!",
        backend: "pysigma-backend-loki",
        correlation: true,
    },
    {
        id: "carbon_black",
        name: "Carbon Black",
        icon: null,
        backend: "pysigma-backend-carbonblack",
    },
    // {id: "cortex_xdr", name: "Cortex XDR", icon: null, backend: 'pysigma-backend-cortexxdr'}, // Disabled due to non-operational backend
    // {
    //     id: "golangexpr",
    //     name: "GoLang Expr",
    //     icon: null,
    //     backend: "pySigma-backend-golangexpr",
    // },  // TODO: Blocked behind pysigma 1.0.0
    // {
    //     id: "powershell",
    //     name: "Powershell",
    //     icon: null,
    //     backend: "pySigma-backend-powershell",
    // }, // Only supports Git package installation
    {
        id: "log_scale",
        name: "CrowdStrike Logscale",
        icon: crowdstrike,
        backend: "pysigma-backend-crowdstrike",
    },
    {
        id: "opensearch_lucene",
        name: "OpenSearch",
        icon: opensearch,
        backend: "pysigma-backend-opensearch",
    },
    { id: "datadog", name: "DataDog", icon: null, backend: "pysigma-backend-datadog" },
    { id: "kusto", name: "KQL (Kusto)", icon: kql, backend: "pysigma-backend-kusto" },
    // {id: "logpoint", name: "LogPoint", icon: null, backend: 'pysigma-backend-logpoint'},
    { id: "net_witness", name: "NetWitness", icon: null, backend: "pysigma-backend-netwitness" },
    { id: "panther", name: "Panther", icon: panther, backend: "pysigma-backend-panther" },
    { id: "quickwit", name: "QuickWit", icon: quickwit, backend: "pysigma-backend-quickwit" },
    { id: "secops", name: "Google SecOps", icon: secops, backend: "pysigma-backend-secops" },
    {
        id: "sentinel_one",
        name: "Sentinel One",
        icon: null,
        backend: "pysigma-backend-sentinelone",
    },
    // {id: "sentinel_one_pq", name: "Sentinel One - PowerQuery", icon: null, backend: 'pysigma-backend-sentinelone'}, // Disabled due to non-operational backaned
    { id: "sqlite", name: "SQLite", icon: sqlite, backend: "pysigma-backend-sqlite" },
    { id: "surreal_ql", name: "SurrealQL", icon: null, backend: "pysigma-backend-surrealql" },
    // {id: "tql", name: "Trellix TQL", icon: null, backend: 'pysigma-backend-trellix'},
    { id: "uberagent", name: "uberAgent", icon: null, backend: "pysigma-backend-uberagent" },
];

/**
 * Map of supported Sigma targets with their details
 * Created from the supportedSiems array
 */
export const SIGMA_TARGETS: Map<string, SigmaTarget> = new Map(
    supportedSiems.map((siem) => [
        siem.id,
        {
            id: siem.id,
            title: siem.name,
            backend: siem.backend,
        },
    ]),
);

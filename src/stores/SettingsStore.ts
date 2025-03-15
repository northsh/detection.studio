import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const defaultAuthor = ref('')
  const defaultSIEM = ref('splunk')
  const defaultTemplate = ref('default')
  
  // Actions
  function setDefaultAuthor(author: string) {
    defaultAuthor.value = author
  }
  
  function setDefaultSIEM(siem: string) {
    defaultSIEM.value = siem
  }
  
  function setDefaultTemplate(template: string) {
    defaultTemplate.value = template
  }
  
  return {
    // State
    defaultAuthor,
    defaultSIEM,
    defaultTemplate,
    
    // Actions
    setDefaultAuthor,
    setDefaultSIEM,
    setDefaultTemplate
  }
}, {
  persist: true
})
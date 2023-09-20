const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('globals', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  search: (searchTerm) => ipcRenderer.invoke('search', searchTerm),
  upload: (content) => ipcRenderer.invoke('upload', content)
})
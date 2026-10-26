const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aihub', {
  loadRegistry: () => ipcRenderer.invoke('registry:load'),
  inspectTool: tool => ipcRenderer.invoke('tool:inspect', tool),
  checkAllUpdates: tools => ipcRenderer.invoke('tool:checkAllUpdates', tools),
  skillStatus: tool => ipcRenderer.invoke('skill:status', tool),
  installTool: tool => ipcRenderer.invoke('tool:install', tool),
  installSkill: (tool, skill) => ipcRenderer.invoke('skill:install', tool, skill),
  openExternal: url => ipcRenderer.invoke('shell:open', url),
  platform: () => ipcRenderer.invoke('app:platform'),
});

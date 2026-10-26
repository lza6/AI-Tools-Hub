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
  appVersion: () => ipcRenderer.invoke('app:version'),
  // 应用自更新
  onUpdateEvent: (cb) => {
    ['update:available', 'update:not-available', 'update:progress', 'update:downloaded', 'update:error'].forEach(ch =>
      ipcRenderer.on(ch, (_e, data) => cb(ch.split(':')[1], data)));
  },
  downloadUpdate: () => ipcRenderer.invoke('update:download'),
  installUpdate: () => ipcRenderer.invoke('update:install'),
});

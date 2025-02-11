import {contextBridge, ipcRenderer} from 'electron';

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency as keyof NodeJS.ProcessVersions] ?? "");
    }
});

contextBridge.exposeInMainWorld(
    "api", {
        invoke: (channel: string, data: any) => {
            let validChannels = [
                "openLink",
                "openLinkInFinder",
                "setSetting",
                "getSetting",
                "getSettings",
                "quit"
            ];
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, data);
            }
        },
    }
);

contextBridge.exposeInMainWorld(
    'bridge', {
        updateSetting: (message: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
            ipcRenderer.on("updateSetting", message);
        },
        onRequest: (channel: string, callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
            ipcRenderer.on(channel, callback);
        },
        sendResponse: (channel: string, data: any) => {
            ipcRenderer.send(channel, data);
        }
    }
);
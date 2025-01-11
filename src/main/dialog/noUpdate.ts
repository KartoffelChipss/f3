import {app, dialog} from "electron";

export default async function (): Promise<boolean> {
    const result = await dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        defaultId: 0,
        title: 'Keine Updates verfügbar',
        message: 'Es sind keine Updates verfügbar.\n\nAktuelle Version: ' + app.getVersion(),
    });

    return true;
}
import {dialog} from "electron";

export default async function (): Promise<'installAndRestart' | 'later'>{
    // Dialog if update should be installed and app restarted
    const result = await dialog.showMessageBox({
        type: 'info',
        buttons: ['Installieren und neu starten', 'Später'],
        defaultId: 0,
        title: 'Update heruntergeladen',
        message: 'Eine neue Version von F3 wurde heruntergeladen. Möchtest du die neue Version installieren und F3 neu starten?',
    });

    if (result.response == 0) return 'installAndRestart';
    else return 'later';
}
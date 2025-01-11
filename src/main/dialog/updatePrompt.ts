import {dialog} from "electron";

export default async function (): Promise<'update' | 'remindlater' | 'discard'> {
    const result = await dialog.showMessageBox({
        type: 'info',
        buttons: ['Updaten', 'Später erinnern', 'Verwerfen'],
        defaultId: 0,
        title: 'Update verfügbar',
        message: 'Eine neue Version von F3 ist verfügbar. Möchtest du sie herunterladen?',
    });

    if (result.response == 0) return 'update';
    else if (result.response == 1) return 'remindlater';
    else return 'discard';
}
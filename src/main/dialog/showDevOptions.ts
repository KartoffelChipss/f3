import {dialog} from "electron";

export default async function (): Promise<boolean> {
    const result = await dialog.showMessageBox({
        type: 'info',
        buttons: ['Cancel', 'Continue'],
        defaultId: 0,
        title: 'Are you sure?',
        message: 'These options are meant for developers and may cause issues if used incorrectly. Are you sure you want to continue?',
    });

    return result.response === 1;
}
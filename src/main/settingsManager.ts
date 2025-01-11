import { app, globalShortcut } from "electron";
import Logger from "electron-log";
import { closeSettingsWindow, createSettingsWindow, getSettingsWindow } from "./windowManager";

export const registerSettingsShortcut = () => {
    const shortcutRegistered = globalShortcut.register("F3", () => {
        toggleSettingsWindow();
    });

    if (!shortcutRegistered) {
        Logger.error("Failed to register F3 shortcut");
    }

    const isRegistered = globalShortcut.isRegistered('F3');
    console.log(`Is F3 registered? ${isRegistered}`);
};

export const toggleSettingsWindow = () => {
    const settingsWindow = getSettingsWindow();

    if (settingsWindow !== null) {
        closeSettingsWindow();
        return;
    }

    createSettingsWindow();
}
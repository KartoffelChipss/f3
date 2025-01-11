import { app, globalShortcut, Menu, nativeImage } from "electron";
import logger from "electron-log/main";
import path from "path";
import "./ipcHandler";
import "dotenv/config";
import { logPath, rendererDir } from "./locations";
import isDev from "electron-is-dev";
import { createCrosshairWindow, createSettingsWindow } from "./windowManager";
import "./settingsManager";
import { registerSettingsShortcut } from "./settingsManager";

export * from "./locations";

logger.transports.file.resolvePathFn = () => logPath;
logger.transports.file.level = "info";
Object.assign(console, logger.functions);

const iconPath = path.resolve(path.join(rendererDir, "img/logo.png"));

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    logger.error("App already running, quitting this instance");
    app.quit();
} else {
    app.on("ready", () => {
        logger.log(" ");
        logger.log("====== ======");
        logger.log("App Started!");
        if (isDev) logger.log("Running in development mode");
        logger.log("====== ======\n");

        logger.info("Arguments:", process.argv);

        if (process.platform === "darwin") {
            if (iconPath) app.dock.setIcon(nativeImage.createFromPath(iconPath));
            app.dock.hide();
        }

        if (!isDev) Menu.setApplicationMenu(Menu.buildFromTemplate([]));

        registerSettingsShortcut();

        createCrosshairWindow();
    });
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
});

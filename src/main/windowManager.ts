import { BrowserWindow, screen, Size } from "electron";
import { distDir, rendererDir } from "./locations";
import path from "path";

let crosshairWindow: BrowserWindow | null = null;
let settingsWindow: BrowserWindow | null = null;

export function createCrosshairWindow(): void {
    if (crosshairWindow) {
        crosshairWindow.show();
        return;
    }

    crosshairWindow = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        minimizable: false,
        maximizable: false,
        darkTheme: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(distDir, "preload.js"),
        },
    });

    centerWindow(crosshairWindow);

    crosshairWindow.setIgnoreMouseEvents(true);

    crosshairWindow.loadFile(path.join(rendererDir, "html", "crosshair.html"));

    crosshairWindow.on("closed", () => {
        crosshairWindow = null;
    });
}

function centerWindow(window: BrowserWindow): void {
    const { width: windowWidth, height: windowHeight } = window.getBounds();
    const primaryDisplay = screen.getPrimaryDisplay()
    const size: Size = primaryDisplay.workAreaSize
    const x = Math.round(size.width / 2 - windowWidth / 2)
    const y = Math.round(size.height / 2 - windowHeight / 2)
    window.setPosition(x, y);
}

export function createSettingsWindow(): void {
    if (settingsWindow) {
        settingsWindow.show();
        return;
    }

    settingsWindow = new BrowserWindow({
        width: 330,
        height: 340,
        resizable: false,
        minimizable: false,
        maximizable: false,
        frame: false,
        vibrancy: 'fullscreen-ui',// on MacOS
        backgroundMaterial: 'acrylic', // on Windows 11
        visualEffectState: 'active',
        darkTheme: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(distDir, "preload.js"),
        },
    });

    const { width: windowWidth, height: windowHeight } = settingsWindow.getBounds();
    const primaryDisplay = screen.getPrimaryDisplay();
    const size: Size = primaryDisplay.workAreaSize;
    const x = Math.round(size.width - windowWidth - 30);
    const y = Math.round(30);
    settingsWindow.setPosition(x, y);

    settingsWindow.loadFile(path.join(rendererDir, "html", "settings.html"));

    settingsWindow.on("closed", () => {
        settingsWindow = null;
    });
}

export function getSettingsWindow(): BrowserWindow | null {
    return settingsWindow;
}

export function getCrosshairWindow(): BrowserWindow | null {
    return crosshairWindow;
}

export function closeSettingsWindow(): void {
    if (settingsWindow) {
        settingsWindow.close();
    }
}
const crossHair = document.getElementById('crosshair');

window.api.invoke("getSettings")
    .then((settings) => {
        console.log(settings);
        crossHair.style.transform = `scale(${settings.scale})`;
        setCrossHairColor(settings.color);
        setCrossHairType(settings.type);
    })

window.bridge.updateSetting((event, data) => {
    console.log(data)

    switch(data.setting) {
        case 'scale': {
            crossHair.style.transform = `scale(${data.value})`;
            break;
        }
        case 'color': {
            console.log(data.value);
            setCrossHairColor(data.value);
            break;
        }
        case 'type': {
            setCrossHairType(data.value);
            break;
        }
    }
});

function setCrossHairColor(color) {
    const root = document.querySelector(":root");
    root.style.setProperty("--crosshair-color", color);
}

function setCrossHairType(type) {
    const allTypes = ["default", "circle", "dot", "box", "diagonal", "corners"];

    allTypes.forEach((t) => {
        crossHair.classList.remove(`crosshair-${t}`);
    });

    crossHair.classList.add(`crosshair-${type}`);
}
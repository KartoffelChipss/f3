window.api.invoke("getSettings")
    .then((settings) => {
        document.getElementById('scale').value = settings.scale;
        document.getElementById('color').value = settings.color;
        document.getElementById('ch-type').value = settings.type;
    })
const canvas = document.querySelector("canvas"), 
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

// Variables globales con valores predeterminados
let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5,
selectedColor = "#000";

const setCanvasBackground = () => {
    // Estableciendo todo el fondo del lienzo en blanco para que la imagen descargada tenga fondo blanco
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; // Restableciendo fillStyle al color seleccionado, será el color del pincel
}

window.addEventListener("load", () => {
    // Configurando el ancho/alto del lienzo; offsetWidth/Height devuelve el ancho/alto visible de un elemento
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    // Si fillColor no está marcado, dibujar un rectángulo con borde, de lo contrario, dibujar un rectángulo con fondo
    if (!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); // Creando una nueva ruta para dibujar un círculo
    // Calculando el radio del círculo según el puntero del mouse
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // Creando el círculo según el puntero del mouse
    fillColor.checked ? ctx.fill() : ctx.stroke(); // Si fillColor está marcado, rellenar el círculo; de lo contrario, dibujar el borde
}

const drawTriangle = (e) => {
    ctx.beginPath(); // Creando una nueva ruta para dibujar un triángulo
    ctx.moveTo(prevMouseX, prevMouseY); // Moviendo el triángulo al puntero del mouse
    ctx.lineTo(e.offsetX, e.offsetY); // Creando la primera línea según el puntero del mouse
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // Creando la línea inferior del triángulo
    ctx.closePath(); // Cerrando la ruta del triángulo para que la tercera línea se dibuje automáticamente
    fillColor.checked ? ctx.fill() : ctx.stroke(); // Si fillColor está marcado, rellenar el triángulo; de lo contrario, dibujar el borde
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // Pasando la posición actual del mouseX como valor de prevMouseX
    prevMouseY = e.offsetY; // Pasando la posición actual del mouseY como valor de prevMouseY
    ctx.beginPath(); // Creando una nueva ruta para dibujar
    ctx.lineWidth = brushWidth; // Pasando el tamaño del pincel como ancho de la línea
    ctx.strokeStyle = selectedColor; // Pasando el color seleccionado como estilo del trazo
    ctx.fillStyle = selectedColor; // Pasando el color seleccionado como estilo de relleno
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); // Copiando datos del lienzo para evitar arrastrar la imagen
}

const drawing = (e) => {
    if (!isDrawing) return; // Si isDrawing es falso, salir de aquí
    ctx.putImageData(snapshot, 0, 0); // Añadiendo los datos del lienzo copiados a este lienzo
    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // Creando línea según el puntero del mouse
        ctx.stroke(); // Dibujando/rellenando la línea con color
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Añadiendo evento click a todas las opciones de herramienta
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // Pasando el valor del slider como tamaño del pincel

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Añadiendo evento click a todos los botones de color
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiando todo el lienzo
    setCanvasBackground();
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); // Creando elemento <a>
    link.download = `${Date.now()}.jpg`; // Pasando la fecha actual como valor de descarga del enlace
    link.href = canvas.toDataURL(); // Pasando los datos del lienzo como valor de href del enlace
    link.click(); // Haciendo clic en el enlace para descargar la imagen
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);

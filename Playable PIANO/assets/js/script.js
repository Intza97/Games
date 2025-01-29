const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
audio = new Audio(`assets/tunes/a.wav`); // por defecto, la fuente del audio es el sonido "a"

const playTune = (key) => {
    audio.src = `assets/tunes/${key}.wav`; // asignar la fuente del audio según la tecla presionada
    audio.play(); // reproducir el audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // obtener el elemento de la tecla presionada
    clickedKey.classList.add("active"); // añadir la clase "active" al elemento de la tecla presionada
    setTimeout(() => { // eliminar la clase "active" del elemento de la tecla presionada después de 150 ms
        clickedKey.classList.remove("active");
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // añadir el valor de data-key al array allKeys
    // llamar a la función playTune pasando el valor de data-key como argumento
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // asignar el valor del rango del slider como volumen del audio
}

const showHideKeys = () => {
    // alternar la clase "hide" de cada tecla al hacer clic en el checkbox
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    // si la tecla presionada está en el array allKeys, solo llamar a la función playTune
    if(allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

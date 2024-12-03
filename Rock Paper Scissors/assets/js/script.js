// Obtener elementos del DOM
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"), // Resultado del usuario
  cpuResult = document.querySelector(".cpu_result img"),   // Resultado de la CPU
  result = document.querySelector(".result"),              // Resultado del juego
  optionImages = document.querySelectorAll(".option_image"); // Imágenes de las opciones

// Recorrer cada elemento de imagen de opción
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active"); // Añadir la clase "active" a la imagen seleccionada
    userResult.src = cpuResult.src = "assets/img/rock.png"; // Configurar imágenes iniciales
    result.textContent = "Espera..."; // Mostrar mensaje de espera

    // Recorrer nuevamente cada imagen de opción
    optionImages.forEach((image2, index2) => {
      // Si el índice actual no coincide con el índice clicado
      // Eliminar la clase "active" de las otras imágenes de opción
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start"); // Añadir la clase "start" al contenedor del juego

    // Configurar un temporizador para retrasar el cálculo del resultado
    let time = setTimeout(() => {
      gameContainer.classList.remove("start"); // Quitar la clase "start" después del retraso
      // Obtener la fuente de la imagen de la opción seleccionada
      let imageSrc = e.target.querySelector("img").src;
      // Configurar la imagen del usuario con la opción seleccionada
      userResult.src = imageSrc;
      // Generar un número aleatorio entre 0 y 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Crear un array de opciones de imagen de la CPU
      let cpuImages = ["assets/img/rock.png", "assets/img/paper.png", "assets/img/scissors.png"];
      // Configurar la imagen de la CPU con una opción aleatoria del array
      cpuResult.src = cpuImages[randomNumber];
      // Asignar un valor de letra a la opción de la CPU (R para piedra, P para papel, S para tijeras)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Asignar un valor de letra a la opción seleccionada por el usuario (basado en el índice)
      let userValue = ["R", "P", "S"][index];
      // Crear un objeto con todos los posibles resultados
      let outcomes = {
        RR: "Empate",   // Piedra contra piedra
        RP: "Cpu",      // Piedra contra papel
        RS: "Usuario",  // Piedra contra tijeras
        PP: "Empate",   // Papel contra papel
        PR: "Usuario",  // Papel contra piedra
        PS: "Cpu",      // Papel contra tijeras
        SS: "Empate",   // Tijeras contra tijeras
        SR: "Cpu",      // Tijeras contra piedra
        SP: "Usuario",  // Tijeras contra papel
      };
      // Buscar el resultado basado en las opciones del usuario y la CPU
      let outComeValue = outcomes[userValue + cpuValue];
      // Mostrar el resultado
      result.textContent = userValue === cpuValue ? "Empate" : `${outComeValue} ganó!!`;
    }, 2500);
  });
});

function allowDrop(event){
    event.preventDefault();
}
function drag(event){
    event.dataTransfer.setData("text",event.target.id);
}
function drop(event){
    event.preventDefault();
    var data =event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data))
}
document.querySelector('.reset').addEventListener('click', () => {
    location.reload(); // Esto recarga la página para reiniciar el juego.
});

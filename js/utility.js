
// funzione per convertire un valore decimale a RGB
function decimalToRgb(decimal) {
      let red = (decimal >> 16) & 0xff;
      let green = (decimal >> 8) & 0xff;
      let blue = decimal & 0xff;
      return 'rgb('+red+','+green+','+blue+')';
}

// funzione per inserire le immagini negli angoli
function inserisciImmagineAngolo(casella,immagine,angolo = 0){
    let div = document.getElementById('casella-' + casella);
    let img = document.createElement('img');
    img.src = immagine;
    img.style.transform = 'rotate(' + angolo + 'deg)';
    img.style.position='absolute';
    img.style.top = 0;
    img.style.bottom = 0;
    img.style.left = 0;
    img.style.right = 0;
    img.style.margin = 'auto';
    div.appendChild(img);
}

// funzione per rimuovere l'immagine di una casella
function rimuoviImmagine(casella){
    let div = document.getElementById('casella-' + casella);
    while (div.firstChild){
        div.removeChild(div.firstChild);
    }
}
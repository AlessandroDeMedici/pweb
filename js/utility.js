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
    img.alt = 'immagine-angolo';
    div.appendChild(img);
}

// funzione per rimuovere l'immagine di una casella
function rimuoviImmagine(casella){
    let div = document.getElementById('casella-' + casella);
    while (div.firstChild){
        div.removeChild(div.firstChild);
    }
}

// funzione per mescolare gli elementi dell'array
function shuffleArray(array){
    for ( let i = array.length - 1 ; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
let homeContainer;
let mainLogo;
let scritta;
let singlePlayer;
let multiPlayer;

let frasi = ["ingegneria deve essere difficile!","Oggi sciopero dei treni!",
            "Hanno avvistato il Prof. Corsini con delle forbici in mano!","frase di prova numero 3",
            "frase di prova numero 4", "frase di prova numero 5"];

function printHome(){
    // devo creare la homepage
    homeContainer = document.getElementById('home-container');

    // creo l'immagine principale con la scritta
    mainLogo = document.createElement('img');
    mainLogo.id = 'main-logo';
    mainLogo.src = '/media/logo.svg';
    homeContainer.appendChild(mainLogo);

    // scritta che cambia contenuto ogni minuto
    scritta = document.createElement('div');
    scritta.id = 'scritta-home'
    scritta.appendChild(document.createTextNode('Hanno avvistato il Prof. Corsini con delle forbici in mano!'));
    setInterval(()=>{
        scritta.firstChild.nodeValue = frasi[Math.floor(Math.random() * frasi.length)];
    },10000);
    homeContainer.appendChild(scritta);

    // creo i due bottoni
    singlePlayer = document.createElement('button');
    singlePlayer.id = 'single-player-button';
    singlePlayer.className = 'homepage-button';
    singlePlayer.appendChild(document.createTextNode('Singleplayer'));
    singlePlayer.onclick = () => {
        gameContainer.style.display = 'flex';
        gameContainer.scrollIntoView({behavior: "smooth"});
        setTimeout(()=>{
            homeContainer.style.display = 'none';
        },1000);
    }

    multiPlayer = document.createElement('button');
    multiPlayer.id = 'multi-player-button';
    multiPlayer.className = 'homepage-button';
    multiPlayer.appendChild(document.createTextNode('Multiplayer'))
    multiPlayer.onclick = () => {
        gameContainer.style.display = 'flex';
        gameContainer.scrollIntoView({behavior: "smooth"});
        setTimeout(()=>{
            homeContainer.style.display = 'none';
        },1000);
    }

    homeContainer.appendChild(singlePlayer);
    homeContainer.appendChild(multiPlayer);
}
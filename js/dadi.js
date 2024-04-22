let fistDice;
let secondDice;
let roll;
let diceContainer;




// funzione che aggiunge i dadi allo schermo schermo
function printDadi(){
    diceContainer = document.createElement('div');
    diceContainer.className = 'dice-container';

    roll = document.createElement('button');
    roll.id = 'roll';
    let text = document.createTextNode('GIRA I DADI!');
    roll.appendChild(text);
    roll.addEventListener('click',randomDice);

    firstDice = printDado();
    firstDice.id = 'firstDice';

    secondDice = printDado();
    secondDice.id = 'secondDice';

    diceContainer.appendChild(firstDice);
    diceContainer.appendChild(secondDice);
    diceContainer.appendChild(roll);
    let centro = document.getElementById('centro');
    centro.appendChild(diceContainer);

}

// funzione per creare un dado
function printDado(){
    let dice = document.createElement('div');
    dice.className = 'dice';

    let face;

    face = document.createElement('div');
    face.className = 'face front';
    dice.appendChild(face);
    face = document.createElement('div');
    face.className = 'face back';
    dice.appendChild(face);
    face = document.createElement('div');
    face.className = 'face top';
    dice.appendChild(face);
    face = document.createElement('div');
    face.className = 'face bottom';
    dice.appendChild(face);
    face = document.createElement('div');
    face.className = 'face right';
    dice.appendChild(face);
    face = document.createElement('div');
    face.className = 'face left';
    dice.appendChild(face);

    return dice;
}


// inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    printDadi();
})


// funzione che va in esecuzione quando premo il pulsante per lanciare i dadi
const randomDice = () => {

    // devo modificare il pulsante
    roll.addEventListener('click', rollDice);
    let text = roll.firstChild;
    text.nodeValue = "LANCIA!";
    firstDice.style.animation = 'rolling 1s infinite linear';
    secondDice.style.animation = 'rolling 1s infinite linear';
}

// funzione che gestisce il comportamento dei dadi
const rollDice = random => {

    roll.removeEventListener('click',rollDice);
    roll.disabled = true;

    setTimeout(() => {


        let random1 = Math.floor(Math.random() * 6);
        let random2 = Math.floor(Math.random() * 6);
        firstDice.style.animation = '';
        secondDice.style.animation = '';

        switch (random1) {
            case 1:
                firstDice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;

            case 6:
                firstDice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;

            case 2:
                firstDice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;

            case 5:
                firstDice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;

            case 3:
                firstDice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;

            case 4:
                firstDice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;

            default:
                break;
        }

        switch (random2) {
            case 1:
                secondDice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;

            case 6:
                secondDice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;

            case 2:
                secondDice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;

            case 5:
                secondDice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;

            case 3:
                secondDice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;

            case 4:
                secondDice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;

            default:
                break;
        }

        let text = roll.firstChild;
        text.nodeValue = "Gira i dadi";
        roll.addEventListener('click',randomDice);
        roll.disabled = false;

    }, 2000);

}

// funzione per nascondere i dadi
function sparisciDadi(){
    diceContainer.style.opacity = '0%';
}

// funzione per far apparire i dadi
function apparireDadi(){
    diceContainer.style.opacity = '100%';
}
let firstDice;
let secondDice;
let diceContainer;
let roll;


// funzione che aggiunge i dadi allo schermo schermo
function printDadi(){
    diceContainer = document.createElement('div');
    diceContainer.className = 'dice-container';
    diceContainer.addEventListener('animationend', () => {
        diceContainer.style.animation = '';
    });

    firstDice = printDado();
    firstDice.id = 'first-dice';

    secondDice = printDado();
    secondDice.id = 'second-dice';

    diceContainer.appendChild(firstDice);
    diceContainer.appendChild(secondDice);
    let centro = document.getElementById('centro');
    centro.appendChild(diceContainer);

    firstDice.addEventListener('animationend',() => {
        firstDice.style.animation = '';
    });

    secondDice.addEventListener('animationend',() => {
        secondDice.style.animation = '';
    });

    roll = document.createElement('button');
    roll.id = 'roll';
    let text = document.createTextNode('Lancia i dadi!');
    roll.appendChild(text);
    roll.addEventListener('click',randomDice);
    centro.appendChild(roll);
    roll.disabled = 0;

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




// funzione che va in esecuzione quando premo il pulsante per lanciare i dadi
const randomDice = () => {

    // faccio girare i dadi
    let random1 = Math.floor(Math.random() * 5) + 1;
    let random2 = Math.floor(Math.random() * 5) + 1;


    diceContainer.style.animation = 'lancio 0.8s ease-in 1';
    switch (random1) {
        case 1:
            firstDice.style.animation = 'rolling 0.8s ease-in 1 reverse';
            firstDice.style.transform = 'rotateX(45deg) rotateZ(45deg)';
            break;

        case 6:
            firstDice.style.animation = 'rolling 0.8s ease-in 1 reverse';
            firstDice.style.transform = 'rotateX(-135deg) rotateZ(-45deg)';
            break;

        case 2:
            firstDice.style.animation = 'rolling 0.8s ease-in 1 reverse';
            firstDice.style.transform = 'rotateX(-45deg) rotateY(-45deg)';
            break;

        case 5:
            firstDice.style.animation = 'rolling 0.8s ease-in 1 reverse';
            firstDice.style.transform = 'rotateX(135deg) rotateY(45deg)';
            break;

        case 3:
            firstDice.style.animation = 'rolling 0.8s ease-in 1 reverse';
            firstDice.style.transform = 'rotateX(-45deg) rotateY(45deg) rotateZ(-90deg)';
            break;

        case 4:
            firstDice.style.animation = 'rolling 0.8s ease-in 1 reverse';
            firstDice.style.transform = 'rotateX(-45deg) rotateY(-135deg) rotateZ(-90deg)';
            break;

        default:
            break;
    }

    switch (random2) {
        case 1:
            secondDice.style.animation = 'rollingLeft 0.8s ease-in 1 reverse';
            secondDice.style.transform = 'rotateX(45deg) rotateZ(45deg)';
            break;

        case 6:
            secondDice.style.animation = 'rollingLeft 0.8s ease-in 1 reverse';
            secondDice.style.transform = 'rotateX(-135deg) rotateZ(-45deg)';
            break;

        case 2:
            secondDice.style.animation = 'rollingLeft 0.8s ease-in 1 reverse';
            secondDice.style.transform = 'rotateX(-45deg) rotateY(-45deg)';
            break;

        case 5:
            secondDice.style.animation = 'rollingLeft 0.8s ease-in 1 reverse';
            secondDice.style.transform = 'rotateX(135deg) rotateY(45deg)';
            break;

        case 3:
            secondDice.style.animation = 'rollingLeft 0.8s ease-in 1 reverse';
            secondDice.style.transform = 'rotateX(-45deg) rotateY(45deg) rotateZ(-90deg)';
            break;

        case 4:
            secondDice.style.animation = 'rollingLeft 0.8s ease-in 1 reverse';
            secondDice.style.transform = 'rotateX(-45deg) rotateY(-135deg) rotateZ(-90deg)';
            break;

        default:
            break;
    }

}

// funzione per nascondere i dadi
function nascondiDadi(){
    diceContainer.style.visibility = 'hidden';
    diceContainer.style.opacity = '0%';
}

// funzione per far apparire i dadi
function mostraDadi(){
    diceContainer.style.visibility = 'visible';
    diceContainer.style.opacity = '100%';
}
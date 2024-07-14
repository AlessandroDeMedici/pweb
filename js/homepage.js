
let mainLogo;
let singlePlayer;
let multiPlayer;
let homeConatiner;
let loginButton;
let registerButton;
let logoutButton;
let erroreLogin;
let erroreRegistrazione;
let confirmLogin;
let confirmRegister;
let recoverButton;

let frasi = [
            "ingegneria deve essere difficile!","Oggi sciopero dei treni!",
            "18 a tutti!","Le cose sono o non sono!",
            "Buongiorno a tutti!","Polo F allagato, riprendiamo domani...",
            "Alta impedenza non e' un valore logico...","...e come tale non si propaga",
        ];


// funzione per stampare la home
function printHome(){
    // inizializzo le variabili
    homeContainer = document.getElementById('home-container');
    loginButton = document.getElementById('login-button');
    registerButton = document.getElementById('register-button');
    logoutButton = document.getElementById('logout-button');
    erroreLogin = document.getElementById('errore-login');
    erroreRegistrazione = document.getElementById('errore-registrazione');
    confirmLogin = document.getElementById('confirm-login');
    confirmRegister = document.getElementById('confirm-register');
    recoverButton = document.getElementById('recover-button');



    // scritta che cambia contenuto ogni minuto
    let scritta = document.getElementById('scritta-home')
    scritta.appendChild(document.createTextNode('Benvenuto su MonopolING'));
    setInterval(()=>{
        scritta.firstChild.nodeValue = frasi[Math.floor(Math.random() * frasi.length)];
    },10000);

    // inizializzo iconcina account
    let account = document.getElementById('account');
    account.onclick = showForm;

    // devo inizializzare il form se l'utente ha gia fatto login oppure no
    if (account.innerHTML == '?'){
        // utente non logged
        logged = 0;
        logoutButton.style.display = 'none';
    } else {
        // utente logged
        logged = 1;
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
    }
    
    // inizializzo i bottoni
    singlePlayer = document.getElementById('single-player-button');
    singlePlayer.onclick = logged ? showGame : avviso;
    
    multiPlayer = document.getElementById('multi-player-button')
    multiPlayer.onclick = logged ? showGame : avviso;

    loginButton.onclick = showLogin;
    registerButton.onclick = showRegister;

    confirmLogin.onclick = login;
    confirmRegister.onclick = register;
    logoutButton.onclick = logout;

    recoverButton.onclick = showRecover;

    mainLogo = document.getElementById('main-logo');
}

// funzione per mostrare il menu di bottoni
function showForm(e){
    if (e)
        e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    recoverForm.style.display = 'none';
    
    if (form.style.display == 'none')
        form.style.display = 'flex';
    else
        form.style.display = 'none';
}

// funzione per mostrare il menu di login
function showLogin(e){

    const erroreLogin = document.getElementById('errore-login');
    erroreLogin.hidden = true;

    if (e)
        e.preventDefault();
    form.style.display = 'none';
    registerForm.style.display = 'none';
    recoverForm.style.display = 'none';

    if (loginForm.style.display == 'none')
        loginForm.style.display = 'flex';
    else
        loginForm.style.display = 'none';
}

// funzione per mostrare il menu di register
function showRegister(e){

    const erroreRegister = document.getElementById('errore-registrazione');
    erroreRegister.hidden = true;

    if (e)
        e.preventDefault();
    loginForm.style.display = 'none';
    form.style.display = 'none';
    recoverForm.style.display = 'none';
    if (registerForm.style.display == 'none'){
        registerForm.style.display = 'flex';
    } else {
        registerForm.style.display = 'none';
    }
}

// funzione per mostrare il menu di recover
function showRecover(e){
    if (e)
        e.preventDefault();

    const erroreRecover = document.getElementById('errore-recover');
    erroreRecover.hidden = true;

    registerForm.style.display = 'none';
    loginForm.style.display = 'none';
    form.style.display = 'none';
    if (recoverForm.style.display == 'none'){
        recoverForm.style.display = 'flex';   
    } else {
        recoverForm.style.display = 'none';
    }
}

// funzione lanciata dai bottoni prima del login
function avviso(){
    alert("devi prima effettuare il login/register tramite il menu in alto a destra");
}

// funzione lanciata dai bottoni dopo il login
function showGame(){
    let gameContainer = document.getElementById('game-container')
    gameContainer.style.display = 'flex';
    gameContainer.scrollIntoView({behavior: "smooth"});
    setTimeout(()=>{
        homeContainer.style.display = 'none';
    },1000);
}


let logged = 0;
let username = '';
let loginForm;
let registerForm;
let form;
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

let frasi = [
            "ingegneria deve essere difficile!","Oggi sciopero dei treni!",
            "18 a tutti!","Le cose sono o non sono!",
            "Buongiorno a tutti!","Polo F allagato, riprendiamo domani...",
            "Alta impedenza non e' un valore logico...","...e come tale non si propaga",
        ];

function printHome(){

    // inizializzo le variabili
    homeContainer = document.getElementById('home-container');
    loginForm = document.getElementById('login-form');
    registerForm = document.getElementById('register-form');
    form = document.getElementById('form');
    loginButton = document.getElementById('login-button');
    registerButton = document.getElementById('register-button');
    logoutButton = document.getElementById('logout-button');
    erroreLogin = document.getElementById('errore-login');
    erroreRegistrazione = document.getElementById('errore-registrazione');
    confirmLogin = document.getElementById('confirm-login')
    confirmRegister = document.getElementById('confirm-register')

    // scritta che cambia contenuto ogni minuto
    let scritta = document.getElementById('scritta-home')
    scritta.appendChild(document.createTextNode('Benvenuto su MonopolING'));
    setInterval(()=>{
        scritta.firstChild.nodeValue = frasi[Math.floor(Math.random() * frasi.length)];
    },10000);

    // creo l'icona dell'account
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

    mainLogo = document.getElementById('main-logo')
}

// funzione per mostrare il form
function showForm(e){
    if (e)
        e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    if (form.style.display == 'none')
        form.style.display = 'flex';
    else
        form.style.display = 'none';
}

function showLogin(e){
    if (e)
        e.preventDefault();
    form.style.display = 'none';
    registerForm.style.display = 'none';
    if (loginForm.style.display == 'none')
        loginForm.style.display = 'flex';
    else
        loginForm.style.display = 'none';
}

function showRegister(e){
    if (e)
        e.preventDefault();
    loginForm.style.display = 'none';
    form.style.display = 'none';
    if (registerForm.style.display == 'none'){
        registerForm.style.display = 'flex';
    } else {
        registerForm.style.display = 'none';
    }
}

// handler login
function login(e) {
    e.preventDefault();

    message = ''

    const data = new FormData(loginForm);
    let array = {};
    data.forEach((valore,chiave)=>{
        array[chiave] = valore;
    });

    fetch('/php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(array)
    })
    .then(result => result.json())
    .then(data => {
        success(data);
    })
    .catch (error => {
        console.log("errore in fase di login");
    });
}

// handler register
function register(event) {
    event.preventDefault();

    const data = new FormData(registerForm);
    let array = {};
    data.forEach((valore,chiave)=>{
        array[chiave] = valore;
    });
    
    if (array['password'] != array['confirm']){
        console.log('le password non coincidono');
        return;
    }

    delete array.confirm;
    
    fetch('/php/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(array)
    })
    .then(result => result.json())
    .then(data => {
        success(data,true);
    })
    .catch (error => {
        console.log(error);
        console.log('Errore durante la comunizazione con il server');
    });
}

// Logout Handler
function logout(e){
    if (e)
        e.preventDefault();

    account = document.getElementById('account')

    account.innerHTML = '?';
    account.style.backgroundColor = '';

    logoutButton.style.display = 'none';
    loginButton.style.display = 'block';
    registerButton.style.display = 'block';

    singlePlayer.onclick = avviso;
    multiPlayer.onclick = avviso;

    array = {'username':username};

    fetch('/php/logout.php',{
        method: 'POST'
    })
    .catch(error => {
        console.log('errore in fase di logout');
    });
    showForm();
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

// funzione lanciata dopo aver ricevuto la risposta php
function success(data, register = false){

    let errore;
    
    // in caso di errore stampo il messaggio
    if (register)
        errore = erroreRegistrazione;
    else
        errore = erroreLogin;

    if (!data['logged']){
        console.log(data)
        let string = new String(data['message']);
        if (string.includes('SQLSTATE[23000]'))
            data['message'] = 'Username gia in uso...';
        errore.firstChild.nodeValue = data['message'];
        errore.hidden = 0;
        return;
    }

    // in caso di login con successo rimuovo il messagggio
    if (errore.firstChild){
        errore.hidden = true;
    }

    if (register)
        showRegister();
    else
        showLogin();
    
    username = data['user'];
    logged = 1;

    account.firstChild.nodeValue = username[0];
    account.style.backgroundColor = '#bfdbae';

    // mostro il pulsante di logout
    logoutButton.style.display = 'block';
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';

    // modifico i pulsanti della home
    singlePlayer.onclick = showGame;
    multiPlayer.onclick = showGame;
}

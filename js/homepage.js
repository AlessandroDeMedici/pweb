let homeContainer;
let mainLogo;
let scritta;
let singlePlayer;
let multiPlayer;
let account;
let loginForm;
let registerForm;
let form;
let logoutButton;
let loginButton;
let registerButton;
let confirmLogin;
let confirmRegister;
let logged = 0;
let username = '';
let erroreLogin;
let erroreRegistrazione;


let frasi = [
            "ingegneria deve essere difficile!","Oggi sciopero dei treni!",
            "18 a tutti!","Le cose sono o non sono!",
            "Buongiorno a tutti!","Polo F allagato, riprendiamo domani...",
            "Alta impedenza non e' un valore logico...","...e come tale non si propaga",
        ];

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
    scritta.appendChild(document.createTextNode('Benvenuto su MonopolING'));
    setInterval(()=>{
        scritta.firstChild.nodeValue = frasi[Math.floor(Math.random() * frasi.length)];
    },10000);
    homeContainer.appendChild(scritta);

    
    // creo l'icona dell'account
    account = document.getElementById('account');
    account.onclick = showForm;
    
    // inizializzo i form
    form = document.getElementById('form');
    form.className = 'form';
    loginForm = document.getElementById('login-form');
    loginForm.className = 'form';
    registerForm = document.getElementById('register-form');
    registerForm.className = 'form';
    loginButton = document.getElementById('login-button');
    registerButton = document.getElementById('register-button');
    loginButton.onclick = showLogin;
    registerButton.onclick = showRegister;
    logoutButton = document.getElementById('logout-button');
    erroreLogin = document.getElementById('errore-login');
    erroreLogin.appendChild(document.createTextNode(''));
    erroreRegistrazione = document.getElementById('errore-registrazione');
    erroreRegistrazione.appendChild(document.createTextNode(''));

    // devo inizializzare il form se l'utente ha gia fatto login oppure no
    if (account.firstChild.nodeValue == '?'){
        // utente non logged
        logoutButton.style.display = 'none';
    } else {
        // utente logged
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
    }


    confirmLogin = document.getElementById('confirm-login');
    confirmRegister = document.getElementById('confirm-register');
    loginForm.onsubmit = login;
    registerForm.onsubmit = register;
    logoutButton.onclick = logout;
    
    
    // creo i due bottoni
    singlePlayer = document.createElement('button');
    singlePlayer.id = 'single-player-button';
    singlePlayer.className = 'homepage-button';
    singlePlayer.appendChild(document.createTextNode('Nuova partita'));
    singlePlayer.onclick = logged ? showGame : avviso;
    
    multiPlayer = document.createElement('button');
    multiPlayer.id = 'multi-player-button';
    multiPlayer.className = 'homepage-button';
    multiPlayer.appendChild(document.createTextNode('Continua'));
    multiPlayer.onclick = logged ? showGame : avviso;
    homeContainer.appendChild(singlePlayer);
    homeContainer.appendChild(multiPlayer);
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

// Login Handler
function login(e) {
    e.preventDefault();

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
        console.log(data);
        success(data);
    })
    .catch (error => {
        console.log(error);
        console.log('Errore durante la comunizazione con il server');
    });
}

// Register Handler
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
        console.log(data);
        success(data,true);
    })
    .catch (error => {
        console.log(error);
        console.log('Errore durante la comunizazione con il server');
    });
}

function logout(e){
    if (e)
        e.preventDefault();

    account.firstChild.nodeValue = '?';
    account.style.backgroundColor = '';

    logoutButton.style.display = 'none';
    loginButton.style.display = 'block';
    registerButton.style.display = 'block';

    singlePlayer.onclick = avviso;
    multiPlayer.onclick = avviso;

    array = {'username':username};

    fetch('/php/logout.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(array)
    })
    .then(result => result.json())
    .then(data => {
        console.log(data);
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
    gameContainer.style.display = 'flex';
    gameContainer.scrollIntoView({behavior: "smooth"});
    setTimeout(()=>{
        homeContainer.style.display = 'none';
    },1000);
}

// funzione lanciata in caso di login avvenuto con successo
function success(data, register = false){

    let errore;
    
    // in caso di errore stampo il messaggio
    if (register)
        errore = erroreRegistrazione;
    else
        errore = erroreLogin;

    if (data['logged'] == false){
        let string = new String(data['message']);
        if (string.includes('SQLSTATE[23000]'))
            data['message'] = 'Username gia in uso...';
        errore.firstChild.nodeValue = data['message'];
        errore.hidden = false;
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

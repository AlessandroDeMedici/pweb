
<div id="login-menu">

    <?php

        if (isset($_SESSION['logged']) && isset($_SESSION['username'])){
            if ($_SESSION['logged']){
                // stampo l'icona dell'utente
                echo '<button id="account" class="account" data-username="'.$_SESSION['username']. '" style="background-color: #bfdbae">' . $_SESSION['username'][0] . '</button>';
            } else {
                // stampo un ? al posto dell'utente
                echo '<button id="account" data-username="" class="account">?</button>';
            }
        } else {
            // stampo un ? al posto dell'utente
            echo '<button id="account" data-username="" class="account">?</button>';
        }

    ?> 

    <!-- BOTTONI PER SELEZIONARE MENU -->
    <form id="form" style="display: none" class="home-form">
        <fieldset>
            <button id="login-button" class="form-button">Login</button>
            <button id="register-button" class="form-button">Register</button>
            <button id="logout-button"  class="form-button">Logout</button>
            <button id="recover-button"  class="form-button">Recupera account</button>
        </fieldset>
    </form>

    <!-- MENU LOGIN -->
    <form id="login-form" style="display: none" class="home-form">
        <fieldset>
            <legend>Login</legend>
            <p>
                <label>Username</label>
                <input type="text" name="username" required pattern="[a-zA-Z0-9]+"/>
            </p>
            <p>
                <label>Password</label>
                <input type="password" name="password" required />
            </p>
            <p class="submit">
                <input id="confirm-login" type="submit" value="Login" class="form-button" />
            </p>
            <p id="errore-login" class="errore" hidden>errore-login</p>
        </fieldset>
    </form>

    <!-- MENU REGISTRAZIONE -->
    <form id="register-form" style="display: none" class="home-form">
        <fieldset>
            <legend>Register</legend>
            <p>
                <label>Username</label>
                <input type="text" name="username" required pattern="[a-zA-Z0-9]+"/>
            </p>
            <p>
                <label>Password</label>
                <input type="password" name="password" required minlength="5"/>
            </p>
            <p>
                <label>Confirm Password</label>
                <input type="password" name="confirm" required minlength="5"/>
            </p>
            <p>
                <label>Domanda di recupero</label>
                <input type="text" list="choices" name="domanda" required/>
                <datalist id="choices">
                    <option value="Qual è il nome del tuo animale domestico?"></option>
                    <option value="Qual è il cognome di tua madre nubile?"></option>
                    <option value="Qual è il titolo del tuo film preferito?"></option>
                    <option value="Qual è il tuo cibo preferito?"></option>
                </datalist>
            </p>
            <p>
                <label>Risposta</label>
                <input type="text" name="risposta" required minlength="3"/>
            </p>
            <p id="errore-registrazione" class="errore" hidden>errore-registrazione</p>
            <p class="submit">
                <input id="confirm-register" type="submit" value="Register" class="form-button" />
            </p>
        </fieldset>
    </form>

    <!-- MENU RECOVER -->
    <form id="recover-form" class="home-form" style="display: none">
        <fieldset>
            <legend>Recupera il tuo account</legend>
            <p>
                <label>Username</label>
                <input type="text" name="username" required pattern="[a-zA-Z0-9]+"/>
            </p>
            <p>
                <label>Domanda di recupero</label>
                <input type="text" list="choices" name="domanda" required/>
            </p>
            <p>
                <label>Risposta</label>
                <input type="text" name="risposta" required minlength="3"/>
            </p>
            <p>
                <label>Nuova password</label>
                <input type="password" name="password" required minlength="5"/>
            </p>
            <p>
                <label>Conferma password</label>
                <input type="password" name="confirm" required minlength="5"/>
            </p>
            <p id="errore-recover" hidden>errore-recover</p>
            <input id="confirm-recover" type="submit" value="Recupera account" class="form-button"/>
        </fieldset>
    </form>
</div>

<script> 
        const loginMenu = document.getElementById('login-menu');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const recoverForm = document.getElementById('recover-form');
        const form = document.getElementById('form');
        const account = document.getElementById('account');
        let username = account.dataset.username;
        let logged = account.dataset.username == '' ? 0 : 1;


        loginForm.onsubmit = login;
        registerForm.onsubmit = register;
        recoverForm.onsubmit = recover;
        form.onsubmit = (e) => e.preventDefault();

        // login handler
        function login(e) {
            e.preventDefault();

            // pulisco errore
            const errore = document.getElementById('errore-login');
            errore.innerHTML = '';
            
            const data = new FormData(loginForm);

            let request = new XMLHttpRequest();
            request.open("post", "../php/login.php");
            request.onload = () => {
                const response = JSON.parse(request.response);
                success(response);
            };
            request.onerror = (event) => console.log(event);
            request.send(data);
        }


        // register handler
        function register(event) {
            event.preventDefault();

            // pulisco errore
            const errore = document.getElementById('errore-registrazione');
            errore.innerHTML = '';

            const data = new FormData(registerForm);

            // validazione input
            const password = data.get('password');
            const confirm = data.get('confirm');
            if (password != confirm){
                errore.innerHTML = 'Le password non coincidono';
                return;
            }

            let request = new XMLHttpRequest();
            request.open("post","../php/register.php");
            request.onload = () =>{
                const response = JSON.parse(request.response);
                success(response,true);
            }
            request.onerror = (e) => console.log(e);
            request.send(data);
        }

        // recover handler
        function recover(e){
            e.preventDefault();

            // pulisco errore
            const errore = document.getElementById('errore-recover');
            errore.innerHTML = '';

            const data = new FormData(recoverForm);
           
            // validazione input
            const password = data.get('password');
            const confirm = data.get('confirm');
            if (password != confirm){
                errore.innerHTML = 'Le password non coincidono';
                errore.hidden = false;
                return;
            }

            let request = new XMLHttpRequest();
            request.open("post","../php/recover.php");
            request.onload = () =>{
                console.log(request.response);
                const response = JSON.parse(request.response);
                let errore = document.getElementById('errore-recover');
                errore.innerHTML = response['message'];
                errore.hidden = false;
            }
            request.onerror = (e) => console.log(e);
            request.send(data);
        }

        // Logout Handler
        function logout(e){
            if (e)
                e.preventDefault();

            const account = document.getElementById('account');
            account.innerHTML = '?';
            account.style.backgroundColor = '';

            const logoutButton = document.getElementById('logout-button');
            const loginButton = document.getElementById('login-button');
            const registerButton = document.getElementById('register-button');
            const recoverButton = document.getElementById('recover-button');

            logoutButton.style.display = 'none';
            loginButton.style.display = 'block';
            registerButton.style.display = 'block';
            recoverButton.style.display = 'block';

            
            const newGame = document.getElementById('bottone-nuova-partita');
            newGame.onclick = avviso;

            fetch('/php/logout.php',{
                method: 'POST'
            })
            .catch(error => {
                console.log(error);
            });
            showForm();
        }


        // funzione lanciata dopo aver ricevuto la risposta in caso di login o register
        function success(data, register = false){

            let errore;

            // in caso di errore stampo il messaggio
            if (register)
                errore = document.getElementById('errore-registrazione');
            else
                errore = document.getElementById('errore-login');

            if (!data['logged']){
                let string = new String(data['message']);
                if (string.includes('SQLSTATE[23000]'))
                    data['message'] = 'Username gia in uso...';
                errore.innerHTML = data['message'];
                errore.hidden = false;
                return;
            }

            // in caso di login con successo rimuovo il messagggio

            errore.hidden = true;
            errore.innerHTML = '';

            if (register)
                showRegister();
            else
                showLogin();

            logged = 1;
            const account = document.getElementById('account');

            giocatori[0].username = data['user'];

            account.dataset.username = data['user'];
            account.firstChild.nodeValue = data['user'][0];
            account.style.backgroundColor = '#bfdbae';

            // mostro il pulsante di logout
            logoutButton.style.display = 'block';
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
            recoverButton.style.display = 'none';

            // modifico i pulsanti della home
            nuovaPartita.onclick = showGame;
        }
</script>
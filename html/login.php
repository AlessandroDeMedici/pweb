

<style>

    /* STILI PER I FORM DI LOGIN */
    #login-menu {
        position: absolute;
        top: 0;
        right: 0;
        margin: 20px;

        width: 200px;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex-direction: column;
    }

    label {
        text-align: center;
    }


    .account{
        margin: 10px;
        
        font-family: Minecraft-8-bit;
        font-size: 30px;
        color: white;
        text-shadow: #555555 3px 3px;
        
        width: 50px;
        height: 50px;
        border-radius: 15px;
        border: 3px solid black;
        box-shadow: black 2px 2px;
        background-color: #AAAAAA;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .home-form {
        width: 230px;
        z-index: 1;
        
        display: flex;
        flex-direction: column;

        padding: 20px;
        
        
        text-align: center;
        color: white;
        font-size: 20px;
        text-shadow: black 2px 2px;
        font-family: Minecraft-8-bit;
    }



    .form-button{
        display: block;
        width: 200px;
        padding: 5px;
        margin: 15px;



        font-family: Minecraft-8-bit;
        font-weight: 500;
        font-size: 20px;
        color: white;
        text-shadow: #555555 2px 2px;


        border: solid 5px black;
        background-color: #AAAAAA;
        box-shadow: black 5px 5px;
    }


    input:invalid {
        background-color: darksalmon;
    }

</style>



<div id="login-menu">

    <?php
        if ($_SESSION['logged']){
            // stampo l'icona dell'utente
            echo '<button id="account" class="account" data-username="'.$_SESSION['username']. '" style="background-color: #bfdbae">' . $_SESSION['username'][0] . '</button>';
        } else {
            // stampo un ? al posto dell'utente
            echo '<button id="account" class="account">?</button>';
        }
    ?> 

    <!-- BOTTONI PER SELEZIONARE MENU -->
    <form id="form" style="display: none" class="home-form">
        <fieldset>
            <button id="login-button" type="button" class="form-button">Login</button>
            <button id="register-button" type="button" class="form-button">Register</button>
            <button id="logout-button" type="button" class="form-button">Logout</button>
            <button id="recover-button" type="button" class="form-button">Recupera account</button>
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
        let username = '';
        let logged = 0;


        loginForm.onsubmit = login;
        registerForm.onsubmit = register;
        recoverForm.onsubmit = recover;
        form.onsubmit = (e) => e.preventDefault();

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


        // handler register
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
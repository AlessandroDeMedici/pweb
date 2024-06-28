<!DOCTYPE html>
<html lang="it">
    <head>
        
        <meta charset="utf-8"/>
        <title>MonopolING</title>

        <?php 
            if (session_status() == PHP_SESSION_NONE)
                session_start();
        ?>

        <!-- HomePage -->
        <script type="text/JavaScript" src="/js/homepage.js"></script>
        <link rel="stylesheet" href="/css/homepage.css"/>

        <!-- Utilita -->
        <script type="text/JavaScript" src="/js/utility.js"></script>

        <!-- Layout di gioco -->
        <script type="text/JavaScript" src="/js/layoutGioco.js"></script>
        <link rel="stylesheet" href="/css/layoutGioco.css"/>

        <!-- Stampa ed inizializzazione della tavola -->
        <link rel="stylesheet" href="/css/board.css"/>
        <script type="text/JavaScript" src="/js/board.js"></script>
    
        <!-- Gestione dei dadi -->
        <link rel="stylesheet" href="/css/dadi.css"/>
        <script type="text/JavaScript" src="/js/dadi.js"></script>

        <!-- Gestione delle proprieta -->
        <link rel="stylesheet" href="/css/casella.css"/>
        <script type="text/JavaScript" src="/js/casella.js"></script>

        <!-- Gestione del gioco -->
        <link rel="stylesheet" href="/css/gioco.css"/>
        <script type="text/JavaScript" src="/js/gioco.js"></script>

        <!-- INIT -->
        <script type="text/JavaScript" src="/js/main.js"></script>
    
    </head>

    <body> 
        <div id="home-container">
            <?php
                if (isset($_SESSION['logged']) && $_SESSION['logged'] == true){
                    // stampo l'icona dell'utente
                    echo '<button id="account" class="account" data-username="'.$_SESSION['username']. '" style="background-color: #bfdbae">' . $_SESSION['username'][0] . '</button>';
                } else {
                    // stampo un ? al posto dell'utente
                    echo '<button id="account" class="account">?</button>';
                }
            ?>

            <form id="form" style="display: none">
                <fieldset>
                    <button id="login-button" type="button" class="form-button">Login</button>
                    <button id="register-button" type="button" class="form-button">Register</button>
                    <button id="logout-button" type="button" class="form-button">Logout</button>
                </fieldset>
            </form>

            <form id="login-form" style="display: none">
                <fieldset>
                    <legend>Login</legend>
                    <p>
                        <label for="login-username">Username</label>
                        <input type="text" id="login-username" name="username" required/>
                    </p>
                    <p>
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" name="password" required />
                    </p>
                    <p class="submit">
                        <input id="confirm-login" type="submit" value="Login" class="form-button" />
                    </p>
                    <p id="errore-login" class="errore" hidden>errore-login</p>
                </fieldset>
            </form>

            <form id="register-form" style="display: none">
                <fieldset>
                    <legend>Register</legend>
                    <p>
                        <label for="register-username">Username</label>
                        <input type="text" id="register-username" name="username" required pattern="[a-zA-Z]+"/>
                    </p>
                    <p>
                        <label for="register-password">Password</label>
                        <input type="password" id="register-password" name="password" required minlength="5"/>
                    </p>
                    <p>
                        <label for="register-confirm">Confirm Password</label>
                        <input type="password" id="register-confirm" name="confirm" required minlength="5"/>
                    </p>
                    <p>
                        <label for="register-question">Domanda di recupero</label>
                        <input type="text" id="register-question" list="choices" name="domanda" required/>
                        <datalist id="choices">
                            <option value="Qual è il nome del tuo animale domestico?"></option>
                            <option value="Qual è il cognome di tua madre nubile?"></option>
                            <option value="Qual è il titolo del tuo film preferito?"></option>
                            <option value="Qual è il tuo cibo preferito?"></option>
                        </datalist>
                    </p>
                    <p>
                        <label for="register-risposta">Risposta</label>
                        <input type="text" id="register-risposta" name="risposta" required minlength="3"/>
                    </p>
                    <p id="errore-registrazione" class="errore" hidden>errore-registrazione</p>
                    <p class="submit">
                        <input id="confirm-register" type="submit" value="Register" class="form-button" />
                    </p>
                </fieldset>
            </form>

            <img id="main-logo" src="/media/logo.svg"></img>
            <div id="scritta-home"></div>

            <button id="single-player-button" class="homepage-button">Nuova partita</button>
            <button id="multi-player-button" class="homepage-button">Continua</button>

        </div>
        <div id="game-container"></div>
    </body>
</html>
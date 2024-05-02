<!DOCTYPE html>
<html>
    <head>
        
        <?php 
            if (session_status() == PHP_SESSION_NONE)
                session_start();
        ?>

        <!-- HomePage -->
        <script type="text/JavaScript" src="/js/homepage.js"></script>
        <link rel="stylesheet" href="/css/homepage.css"/>

        <!-- Utilita -->
        <script type="text/JavaScript" src="/js/utility.js"></script>

        <!-- Inclusione del font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">

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
        <script type="text/JavaScript" src="/js/init.js"></script>
    
    </head>
    <body> 
        <div id="home-container">
            <?php
                if (isset($_SESSION['logged'])){
                    // stampo l'icona dell'utente
                    echo '<button id="account" class="account">' + substr($_SESSION['username'],0,1) + '</button>';
                } else {
                    // stampo un ? al posto dell'utente
                    echo '<button id="account" class="account">?</button>';
                }
            ?>

            <form id="form" style="display: none">
                <fieldset>
                    <button id="login-button" class="form-button">Login</button>
                    <button id="register-button" class="form-button">Register</button>
                    <button id="logout-button" class="form-button">Logout</button>
                </fieldset>
            </form>


            <form id="login-form" style="display: none">
                <fieldset>
                    <legend>Login</legend>
                    <p>
                        <label for="username">Username</label>
                        <input type="text" name="username" required />
                    </p>
                    <p>
                        <label for="password">Password</label>
                        <input type="password" name="password" required />
                    </p>
                    <p class="submit">
                        <input id="confirm-login" type="submit" value="Login" class="form-button" />
                    </p>

                    <p id="errore-login" hidden class="errore"></p>
                </fieldset>
            </form>


            <form id="register-form" style="display: none">
                <fieldset>
                    <legend>Register</legend>
                    <p>
                        <label for="username">Username</label>
                        <input type="text" name="username" required minlength="4" />
                    </p>
                    <p>
                        <label for="password">Password</label>
                        <input type="password" name="password" required minlength="5" />
                    </p>
                    <p>
                        <label for="confirm">Confirm Password</label>
                        <input type="password" name="confirm" required minlength="5" />
                    </p>
                    <p>
                        <label for="question">Domande di sicurezza</label>
                        <input type="text" list="choices" name="domanda" required />
                        <datalist id="choices">
                            <option value="In what city were you born?"></option>
                            <option value="What is the name of your favorite pet?"></option>
                            <option value="What is your mother's maiden name?"></option>
                            <option value="What high school did you attend?"></option>
                            <option value="What is the name of your first school?"></option>
                            <option value="What was the make of your first car?"></option>
                            <option value="What was your favorite food as a child?"></option>
                        </datalist>
                    </p>
                    <p>
                        <label for="answer">Risposta</label>
                        <input type="text" name="risposta" required minlength="3" />
                    </p>

                    <p id="errore-registrazione" class="errore" hidden></p>

                    <p class="submit">
                        <input id="confirm-register" type="submit" value="Register" class="form-button" />
                    </p>
                </fieldset>
            </form>
        </div>
        <div id="game-container"></div>
    </body>
</html>
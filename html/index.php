<!DOCTYPE html>
<html lang="it">
    <head>
        
        <meta charset="utf-8"/>
        <title>MonopolING</title>
        
        <?php
            if (session_status() == PHP_SESSION_NONE){
                session_start();
                $_SESSION['logged'] = false;
                $_SESSION['username'] = '';
            }
        ?>


        <!-- Include -->
        <link rel="stylesheet" href="/css/include.css" />

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

        <!-- login -->
        <link rel="stylesheet" href="/css/login.css" />
    
    </head>

    <body> 
        <div id="home-container">
            <?php include './login.php' ?>

            <img id="main-logo" src="/media/logo.svg"></img>
            <div id="scritta-home"></div>

            <button id="single-player-button" class="homepage-button">Nuova partita</button>
            <button id="multi-player-button" class="homepage-button">Continua</button>

        </div>
        <div id="game-container"></div>
    </body>
</html>
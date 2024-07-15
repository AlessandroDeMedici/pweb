<!DOCTYPE html>
<html lang="it">
    <head>
        
        <meta charset="utf-8"/>
        <title>MonopolING</title>
        <link rel="icon" type="image/x-icon" href="/media/icon/icon.png">
        
        <?php
            if (session_status() == PHP_SESSION_NONE){
                session_start();
                $_SESSION['logged'] = false;
                $_SESSION['username'] = '';
            }
        ?>


        <!-- Include -->
        <link rel="stylesheet" href="/css/include.css" />

        <!-- Utilita -->
        <script src="/js/utility.js"></script>

        <!-- HomePage -->
        <script src="/js/homepage.js"></script>
        <link rel="stylesheet" href="/css/homepage.css"/>

        <!-- Layout di gioco -->
        <script src="/js/layoutGioco.js"></script>
        <link rel="stylesheet" href="/css/layoutGioco.css"/>

        <!-- Stampa ed inizializzazione della tavola -->
        <link rel="stylesheet" href="/css/board.css"/>
        <script src="/js/board.js"></script>
    
        <!-- Gestione dei dadi -->
        <link rel="stylesheet" href="/css/dadi.css"/>
        <script src="/js/dadi.js"></script>

        <!-- Gestione delle proprieta -->
        <link rel="stylesheet" href="/css/casella.css"/>
        <script src="/js/casella.js"></script>

        <!-- Gestione dei giocatori -->
        <script src="/js/giocatori.js"></script>

        <!-- Gestione dei mazzi di probabilita ed imprevisti -->
        <script src="/js/carte.js"></script>

        <!-- Gestione delle offerte -->
        <script src="/js/offerte.js"></script>

        <!-- Gestione delle case -->
        <script src="/js/case.js"></script>

        <!-- Gestione della messageBox -->
        <link rel="stylesheet" href="/css/messageBox.css" />
        <script src="/js/messageBox.js"></script>

        <!-- Gestione del gioco -->
        <link rel="stylesheet" href="/css/gioco.css"/>
        <script src="/js/gioco.js"></script>
        
        <!-- Gestione dell'AI degli npc -->
        <script src="/js/ai.js"></script>

        <!-- INIT -->
        <script src="/js/main.js"></script>
    
    </head>

    <body>

        <!-- Contenitore homepage -->
        <div id="home-container">
            
            <!-- Login -->
            <?php include './login.php' ?>

            <img id="main-logo" src="/media/logo.svg" alt="Logo Principale"/>
            <div id="scritta-home"></div>

            <button id="bottone-nuova-partita" class="homepage-button">Nuova partita</button>
            <button id="bottone-classifica" class="homepage-button">Classifica</button>

            <!-- documentazione -->
            <a href="documentazione.html">Documentazione</a>

            <!-- Classifica -->
            <?php include './classifica.php' ?>

        </div>
        
        <!-- Contenitore gioco -->
        <div id="game-container"></div>

    </body>
</html>
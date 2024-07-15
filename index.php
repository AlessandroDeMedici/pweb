<?php 

    /* BREVE SPIEGAZIONE DEL SERVIZIO */

    /* Questa applicazione web implementa il gioco del Monopoli

    Questa applicazione e' composta da una homepage in cui e' possibile fare login ed una pagina di gioco, accedibile solo dopo
    che il login e' avvenuto con successo
    
    1. Home page
        E' possibile fare login, registrazione, recover dell'account dal menu in alto a destra. per aprirlo e' sufficiente cliccarci sopra
        
        Una volta acceduti e' possibile avviare una partita con Nuova Partita, si aprira' la schermata con il menu di gioco

        Tramite il pulsante "Classifica" e' invece possibile visualizzare la classifica dei giocatori ed il loro punteggio.
        Per chiudere la schermata che si apre bisogna cliccare sulla X in alto a destra
    
    2. Schermata di gioco
        L'interfaccia per giocare a monopolING si compone di 3 sezioni: (partendo da sinistra)
            a. Una schermata dove vengono mostrate tutte le proprieta che si possiedono

            b. Il tabellone di gioco

            c. Un menu informativo con le informazioni sui giocatori e le offerte

        Per poter avviare la partita e' sufficiente cliccare il pulsante al centro del tabellone

    3. durante il proprio turno il giocatore, come nel famoso gioco del Monopoli puo' lanciare i dadi, acquistare proprieta, inviare ed accettare offerte

        a. per lanciare i dadi premere il bottone al centro dello schermo
        
        b. per terminare il turno premere il bottone al centro dello schermo

        c. per acquistare una casella o visualizzarla premere sulla casella con il mouse

        d. per accettare offerte bisogna prima selezionare l'offerta dal menu sulla destra e premere sul bottone VIEW

        e. per inviare un'offerta crearla dal bottone "nuova offerta" in basso a destra

    4. Il gioco termina quando il giocatore principale riesce a far finire in bancarotta tutti gli altri giocatori oppure quando lui finisce in bancarotta, in tal caso ha perso


    PICCOLA NOTA: vengono generati warn di 2 tipi dal validatore HTML
        1.  il primo tipo riguarda gli elementi nella tabellone di gioco
            per semplicita' questo e' ottenuto prima da una tabella densa e successivamente vengono selezionate solo le caselle utili
            le caselle inutili non vengono eliminate ma gli viene messo display: none

        2.  Immagini senza attributo src
            Queste immagini fanno parte di campi interattivi che vengono inizializzati dinamicamente

    */


    header('Location: ./html/index.php');

?>
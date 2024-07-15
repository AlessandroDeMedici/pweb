// funzione chiamata dal bottone per comprare una proprieta
function compraProprieta(e){
    e.preventDefault();
    
    let nome = e;

    let bottone = e.target;
    nome = bottone.dataset.nome;

    // ottengo un riferimento alla casella
    let casella = null;
    casella = getCasella(nome);

    if (!casella){
        //debug
        //console.log('compraProprieta - nesssuna casella con questo nome');
        return;
    }

    // ottengo un riferimento al giocatore
    let player = giocatori[0];

    // controllo che la casella sia acquistabile
    if (!casella.acquistabile){
        return;
    }

    // controllo che la casella non abbia owner
    if (casella.owner){
        return;
    }

    // controllo che il giocatore abbia abbastanza saldo
    if (player.saldo < casella.prezzo[0]){
        alert('Non hai abbastanza soldi per comprare questa casella');
        return;
    }

    // a questo punto il giocatore ha acquistato la proprieta
    player.proprieta.push(casella);

    casella.owner = 0;
    casella.case = 0;
    casella.alberghi = 0;
    
    // aggiorno il saldo ed aggiorno il saldo a video
    player.paga(casella.prezzo[0]);
    player.updateSaldo();
    casella.stampaProprieta();

    // stampo a log
    printMessage(giocatori[0].username + ' ha acquistato ' + casella.nome);

    // nascondo la message box
    const messageBox = document.getElementById('message-box');
    messageBox.style.visibility = 'hidden';
}

// funzione chiamata per vendere una proprieta
function vendiProprieta(e){
    e.preventDefault();

    let nome = e.target.dataset.nome;

    let casella = null;
    casella = getCasella(nome);

    if (!casella){
        //debug
        //console.log('vendiProprieta - nessuna casella con questo nome');
        return;
    }


    // controllo che l'owner sia il giocatore
    if (casella.owner != 0){
        alert("Non possiedi questa casella!");
        return;
    }

    if (casella.case || casella.albergo){
        alert("Non puoi vendere proprieta con case");
        return;
    }

    // procedo a venderla

    if (!confirm("Sei sicuro di voler vendere la proprieta?")){
        return;
    }

    casella.owner = null;
    let player = giocatori[0];
    player.ricevi(casella.prezzo[0]);
    player.updateSaldo();

    // rimuovo la proprieta dall'array delle proprieta
    let indice = player.proprieta.indexOf(casella);
    player.proprieta.splice(indice,1);
    
    // stampo a log
    printMessage(giocatori[0].username + ' ha venduto ' + casella.nome);

    // rimuovo la proprieta a video
    casella.rimuoviProprieta();

    // nascondo la message box
    const messageBox = document.getElementById('message-box');
    messageBox.style.visibility = 'hidden';
}

// funzione chiamata per comprare una casa
function compraCasa(e){
    e.preventDefault();

    // ottengo riferimento alla proprieta
    let nome = e;
    let bottone = e.target;
    //debug
    //console.log(bottone.dataset.nome);
    nome = bottone.dataset.nome;

    // ottengo riferimento al giocatore
    let player = giocatori[0];

    let casella = getCasella(nome);

    if (!casella){
        //debug
        //console.log('compraCasa - nessuna casella con questo nome');
        return;
    }

    // controllo che l'owner sia il giocatore
    if (casella.owner != 0){
        alert("Non possiedi questa proprieta");
        return;
    }

    // controllo che il giocatore possieda l'intera serie
    if (!interaSerie(player.numId,casella.gruppo)){
        alert("Devi prima possedere l'intera serie per acquistare case!");
        return;
    }

    if (casella.albergo){
        alert("Non puoi acquistare altre case per questa proprieta");
        return;
    }

    // controllo che si possano acquistare case
    if (casella.case == 4 && casella.albergo == 0){
        // acquisto albergo

        // 1. controllo di avere il saldo disponibile per farlo
        if (player.saldo < casella.prezzo[2]){
            alert("non hai abbastanza soldi per acquistare una l'albergo");
            return;
        }

        // 2. aggiorno il saldo ed aggiungo l'albergo
        casella.case = 0;
        casella.albergo = 1;
        player.saldo -= casella.prezzo[2];

        casella.stampaCase();
        
    } else if (casella.case < 4){

        // 1. controllo saldo
        if (player.saldo < casella.prezzo[1]){
            alert("non hai abbastanza soldi per acquistare una casa");
            return;
        }

        // 2. aggiorno saldo ed aggiungo la casa
        casella.case++;
        player.saldo -= casella.prezzo[1];


    } else {
        alert("non puoi acquistare altre case per questa proprieta'");
        return;
    }

    // aggiorno il saldo a video
    player.updateSaldo();
    
    // stampo a log
    printMessage(giocatori[0].username + ' ha comprato una casa su ' + casella.nome);

    // aggiorno le case a video
    casella.stampaCase();
}

// funzione chiamata per vendere una casa
function vendiCasa(e){
    e.preventDefault();

    let casella = null;
    let nome = e.target.dataset.nome;
    casella = getCasella(nome);

    let player = giocatori[0];

    if (!casella){
        //debug
        //console.log('vendiCasa - nessuna casella con questo nome');
        return;
    }


    // controllo che il giocatore sia owner della casa
    if (casella.owner != 0){
        alert("non possiedi questa proprieta");
        return;
    }

    // controllo che la proprieta abbia delle case
    if (casella.case == 0 && casella.albergo == 0){
        alert("non possiedi case su questa proprieta");
        return;
    }

    // se vendo l'albergo viene rimpiazzato da 4 case
    if (casella.albergo){
        casella.albergo = 0;
        casella.case = 4;
        player.saldo += casella.prezzo[2];
    } else {
        casella.case--;
        player.saldo += casella.prezzo[1];
    }

    // aggiorno le case a video
    // aggiorno il saldo a video
    player.updateSaldo();

    
    // stampo a log
    printMessage(giocatori[0].username + ' ha venduto una casa su ' + casella.nome);

    // aggiorno le case a video
    casella.stampaCase();
}
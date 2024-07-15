// file con metodi relativi all'inizializzazione e gestione di messageBox


// funzione per inizializzare le finestre di view offer e make offer
// ed i relativi bottoni
function initMessageBox(){
    let messageBox = document.getElementById('message-box');
    let makeOffer = document.createElement('form');
    let viewOffer = document.createElement('form');
    messageBox.appendChild(makeOffer);
    messageBox.appendChild(viewOffer);

    makeOffer.style.display = 'none';
    viewOffer.style.display = 'none';

    makeOffer.id = 'make-offer';
    viewOffer.id = 'view-offer';

    //DEBUG
    let messageContainer = document.getElementById('message-container');
    messageContainer.style.display = 'none';
    makeOffer.style.display = 'block';
    

    // layout di make offer
    let titleMakeOffer = document.createElement('h1');
    titleMakeOffer.className = 'message-box-title';
    titleMakeOffer.innerHTML = 'Make Offer';
    makeOffer.appendChild(titleMakeOffer);

    let playerList = document.createElement('p');
    playerList.className = 'player-list-offer';
    makeOffer.appendChild(playerList);

    

    // aggiungo tutti i giocatori alla lista
    for (let giocatore in giocatori){
        let player = giocatori[giocatore];

        // tutti i player tranne il main player
        if (player.id == 'giocatore-0')
            continue;

        let radio = document.createElement('input');
        radio.type = 'radio'
        radio.id = 'radio-' + player.id;
        radio.name = 'giocatore';
        radio.value = player.id;

        radio.addEventListener('input',(e)=>{
            e.preventDefault();

            // attivo il bottone
            const sendOffer = document.getElementById('send-offer');
            sendOffer.disabled = 0;

            // aggiorno la lista
            let radio_id = e.target.id.split('-');
            let id = Number(radio_id[2]);

            let player = giocatori[id];

            let checkList = document.getElementById('offer-checklist-2');
            checkList.innerHTML = '';

            let prop_id = 0;
            for (let prop of player.proprieta){
                let check = document.createElement('input');
                check.type = 'checkbox';
                check.name = 'proprieta-2-' + prop_id;
                check.id = 'checkbox-2-' + prop_id;
                check.value = prop.nome;


                let label = document.createElement('label');
                label.htmlFor = 'checkbox-2-' + prop_id++;
                label.innerHTML = prop.nome;

                checkList.appendChild(label);
                label.appendChild(check);
                checkList.appendChild(document.createElement('br'));
            }
        });

        if (player.id == 'giocatore-1')
            radio.checked = 1;

        let label = document.createElement('label');
        label.htmlFor = 'radio-' + player.id;

        let img = document.createElement('img');
        img.src = player.pedina.src;
        label.appendChild(img);
        img.alt = 'pedina';

        let p = document.createElement('span');
        p.id = 'nome-radio-' + player.numId;
        p.className = 'nome-radio';

        label.appendChild(p);
        label.appendChild(radio);
        playerList.appendChild(label);
    }
    
    
    // ho bisogno di inserire 2 finestre con proprieta e soldi da scegliere
    let container = document.createElement('div');
    container.className = 'container-make-offer';
    makeOffer.appendChild(container);

    {
        // primo giocatore
        let firstPlayer = document.createElement('div');
        container.appendChild(firstPlayer);
        firstPlayer.className = 'make-offer-player';

        // creo la checklist
        let checkList = document.createElement('p');
        firstPlayer.appendChild(checkList);
        checkList.id = 'offer-checklist-1';
        checkList.className = 'make-offer-checklist';

        let sliderContainer = document.createElement('p');

        let slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'slider-1';
        slider.max = giocatori[0].saldo;

        let label = document.createElement('label');
        sliderContainer.appendChild(label);
        sliderContainer.appendChild(document.createElement('br'));
        sliderContainer.appendChild(slider);
        label.innerHTML = slider.value;

        label.htmlFor = 'slider-1';
        label.id = 'label-slider-1';
        slider.addEventListener('input',(e)=>{
            e.preventDefault();
            let label = document.getElementById('label-slider-1');
            label.innerHTML = e.target.value;
        })
        firstPlayer.appendChild(sliderContainer);
    }

    {
        // aggiungo una riga verticale
        let div = document.createElement('div');
        container.appendChild(div);
        div.className = 'vertical-line';
    }


    {
        // secondo giocatore
        let player = document.createElement('div');
        container.appendChild(player);
        player.className = 'make-offer-player';

        // creo la checklist
        let checkList = document.createElement('p');
        player.appendChild(checkList);
        checkList.id = 'offer-checklist-2';
        checkList.className = 'make-offer-checklist';

        // prima inizializzazione ma poi deve cambiare
        let id = 0;
        for (let prop in giocatori[1].proprieta){
            let p = giocatori[1].proprieta[prop];

            let check = document.createElement('input');
            check.type = 'checkbox';
            check.name = 'proprieta-2-' + id;
            check.id = 'checkbox-1-' + id;
            check.value = p.nome;

            let label = document.createElement('label');
            label.htmlFor = 'checkbox-1-' + id++;
            label.appendChild(document.createTextNode(p.nome));

            checkList.appendChild(check);
            checkList.appendChild(label);
            checkList.appendChild(document.createElement('br'));
        }

        let sliderContainer = document.createElement('p');

        let slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'slider-2';
        slider.max = giocatori[0].saldo;

        let label = document.createElement('label');
        sliderContainer.appendChild(label);
        sliderContainer.appendChild(document.createElement('br'));
        sliderContainer.appendChild(slider);
        label.innerHTML = slider.value;

        label.htmlFor = 'slider-2';
        label.id = 'label-slider-2';
        slider.addEventListener('input',(e)=>{
            e.preventDefault();
            let label = document.getElementById('label-slider-2');
            label.innerHTML = e.target.value;
        })
        player.appendChild(sliderContainer);
    }

    // aggiugno un paio di bottoni
    let sendOffer = document.createElement('button');
    sendOffer.id = 'send-offer';
    sendOffer.onclick = inviaOfferta;
    sendOffer.innerHTML = 'Invia';
    makeOffer.appendChild(sendOffer);


    // inizializzo il layout di viewoffer
    // titolo
    let titleViewOffer = document.createElement('h1');
    titleViewOffer.innerHTML = 'View Offer';
    viewOffer.appendChild(titleViewOffer);
    titleViewOffer.className = 'view-offer-title';

    let containerViewOffer = document.createElement('div');
    containerViewOffer.className = 'view-offer-container';
    viewOffer.appendChild(containerViewOffer);

    {
        // casella del giocatore 1
        let container = document.createElement('div');
        container.className = 'view-offer-player-container';

        // immagine che devo inizializzare quando premo il bottone view offer
        let img = document.createElement('img');
        container.appendChild(img);
        img.id = 'view-offer-img-1';
        img.alt = 'pedina';

        // nome
        let name = document.createElement('h2');
        container.appendChild(name);
        name.id = 'view-offer-name-1';

        // lista delle proprieta
        let propContainer = document.createElement('div');
        propContainer.id = 'view-offer-properties-1';
        container.appendChild(propContainer);
        propContainer.className = 'view-offer-properties';

        // dollari
        let money = document.createElement('h2');
        money.id = 'view-offer-money-1';
        container.appendChild(money);
        money.className = 'view-offer-money';

        containerViewOffer.appendChild(container);
    }

    let vl = document.createElement('div');
    vl.className = 'vertical-line';
    containerViewOffer.appendChild(vl);

    {
        // casella del giocatore 2
        let container = document.createElement('div');
        container.className = 'view-offer-player-container';

        // immagine che devo inizializzare quando premo il bottone view offer
        let img = document.createElement('img');
        container.appendChild(img);
        img.id = 'view-offer-img-2';
        img.alt = 'pedina';

        // nome
        let name = document.createElement('h2');
        container.appendChild(name);
        name.id = 'view-offer-name-2';

        // lista delle proprieta
        let propContainer = document.createElement('div');
        propContainer.id = 'view-offer-properties-2';
        container.appendChild(propContainer);
        propContainer.className = 'view-offer-properties';

        // dollari
        let money = document.createElement('h2');
        money.id = 'view-offer-money-2';
        container.appendChild(money);
        money.className = 'view-offer-money';

        containerViewOffer.appendChild(container);
    }

    // inserisco i bottoni in view offer che sono accetta e rifiuta
    {
        let buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        let button1 = document.createElement('button');
        buttonContainer.appendChild(button1);
        button1.innerHTML = 'Accetta';
        button1.id = 'accetta';
        button1.style.backgroundColor = '#27ae60';
        button1.style.color = 'white';
        button1.className = 'view-offer-button';
        button1.onclick = accettaOfferta;

        let button2 = document.createElement('button');
        buttonContainer.appendChild(button2);
        button2.innerHTML = 'Rifiuta';
        button2.id = 'rifiuta';
        button2.style.backgroundColor = '#c0392b';
        button2.style.color = 'white';
        button2.className = 'view-offer-button';
        button2.onclick = rifiutaOfferta;

        viewOffer.appendChild(buttonContainer);

    }

    // inizializzo il bottone
    let bottone2 = document.getElementById('nuova-offerta');
    bottone2.onclick = mostraMakeOffer;


    // inizializzo i bottoni per comprare/vendere proprieta/case
    {
        const compra = document.getElementById('compra');
        const vendi = document.getElementById('vendi');
        const compraC = document.getElementById('compra-casa');
        const vendiC = document.getElementById('vendi-casa');


        compra.onclick = compraProprieta;
        vendi.onclick = vendiProprieta;
        compraC.onclick = compraCasa;
        vendiC.onclick = vendiCasa;
    }
}

// funzione per inizializzare i nomi degli utenti in make offer
function nomeMakeOffer(){
    let ps = document.querySelectorAll('.nome-radio');
    for (let p of ps){
        let id = Number(p.id.split('-')[2]);
        p.innerHTML = giocatori[id].username;
    }
}

function mostraMakeOffer(e){
    e.preventDefault();

    // send offer disabilitato
    const sendOffer = document.getElementById('send-offer');
    sendOffer.disabled = true;

    let messageContainer = document.getElementById('message-container');
    let viewOffer = document.getElementById('view-offer');
    let makeOffer = document.getElementById('make-offer');

    messageContainer.style.display = 'none';
    viewOffer.style.display = 'none';
    makeOffer.style.display = 'flex';

    // ogni volta che viene chiamato crea offerta mostra le mie proprieta aggiornate
    let c = document.getElementById('offer-checklist-1');
    c.innerHTML = '';
    let clean = document.getElementById('offer-checklist-2');
    clean.innerHTML = '';
    
    
    // deseleziono il giocatore
    const players = document.querySelectorAll('input[type="radio"][name="giocatore"]');
    for (let p of players){
        if (p.checked){
            p.checked = false;
        }
    }

    let player = giocatori[0];

    let id = 0;
    for (let p in player.proprieta){
        let a = player.proprieta[p];

        let check = document.createElement('input');
        check.type = 'checkbox';
        check.name = 'proprieta-1-' + id;
        check.id = 'checkbox-1-' + id;
        check.value = a.nome;

        let label = document.createElement('label');
        label.htmlFor = 'checkbox-1-' + id++;
        label.innerHTML = a.nome;

        c.appendChild(label);
        label.appendChild(check);
        c.appendChild(document.createElement('br'));
    }

    // mostro anche il saldo aggiornato
    let slider = document.getElementById('slider-1');
    slider.max = giocatori[0].saldo;

    let messageBox = document.getElementById('message-box');
    messageBox.style.visibility = 'visible';

}

// funzione per visualizzare un'offerta
function mostraViewOffer(e){
    e.preventDefault();

    let messageContainer = document.getElementById('message-container');
    let viewOffer = document.getElementById('view-offer');
    let makeOffer = document.getElementById('make-offer');

    messageContainer.style.display = 'none';
    viewOffer.style.display = 'block';
    makeOffer.style.display = 'none';

    let messageBox = document.getElementById('message-box');
    messageBox.style.visibility = 'visible';

    // ottengo id offerta
    let id = Number(e.target.dataset.id);

    // ottengo i dati dell'offerta
    let offerta = offerte[id];

    
    const accetta = document.getElementById('accetta');
    const rifiuta = document.getElementById('rifiuta');
    
    // inizializzo i bottoni
    accetta.dataset.id = id;
    rifiuta.dataset.id = id;

    // offerta rivolta al giocatore ed ancora attiva
    if (offerta.status && offerta.id2 == 0){
        // allora mostro i bottoni abilitati
        accetta.disabled = false;
        rifiuta.disabled = false;
    } else {
        // altrimenti mostro i bottoni disabilitati
        accetta.disabled = true;
        rifiuta.disabled = true;
    }

    // inizializzo i campi di view offer
    let player1 = giocatori[offerta.id1];
    let player2 = giocatori[offerta.id2];

    {
        // inizializzo i campi del primo player
        //immagine
        let img = document.getElementById('view-offer-img-1');
        img.src = player1.pedina.src;
        img.alt='pedina';

        let name = document.getElementById('view-offer-name-1');
        name.innerHTML = player1.username;

        //proprieta
        let prop = document.getElementById('view-offer-properties-1');
        prop.innerHTML = '';
        for (let p in offerta.proprieta1){
            let proprieta = offerta.proprieta1[p];
            
            let c = document.createElement('p');
            c.innerHTML = proprieta.nome;

            prop.appendChild(c);
        }

        // soldi
        let soldi = document.getElementById('view-offer-money-1');
        soldi.innerHTML = '$' + offerta.soldi1;
    }

    {
        // inizializzo i campi del secondo player
        //immagine
        let img = document.getElementById('view-offer-img-2');
        img.src = player2.pedina.src;
        img.alt='pedina';

        let name = document.getElementById('view-offer-name-2');
        name.innerHTML = player2.username;

        //proprieta
        let prop = document.getElementById('view-offer-properties-2');
        prop.innerHTML = '';
        for (let p in offerta.proprieta2){
            let proprieta = offerta.proprieta2[p];
            
            let c = document.createElement('p');
            c.innerHTML = proprieta.nome;

            prop.appendChild(c);
        }

        // soldi
        let soldi = document.getElementById('view-offer-money-2');
        soldi.innerHTML = '$' + offerta.soldi2;
    }

}
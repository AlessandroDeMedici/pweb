// funzione per attendere che il giocatore avvii la partita
function waitStart(){
    return new Promise((resolve) => {
        const roll = document.getElementById('roll');
        roll.innerHTML = 'Avvia il Gioco!';
        roll.disabled = false;
        roll.addEventListener('click',() => { roll.disabled = true; roll.innerHTML = 'Lancia i dadi!'; resolve(); }, {once: true});
    });
}

// funzione per attendere che un player prema i dadi
function waitForDice(){
    return new Promise((resolve) => {
        const roll = document.getElementById('roll');
        roll.disabled = false;
        roll.addEventListener('click', () => { roll.disabled = true; resolve(randomDice());}, {once: true});
    })
}

// funzione per modificare il bottone  dei dadi con termina turno
function waitForEndTurn(){
    return new Promise((resolve) => {
        const roll = document.getElementById('roll');
        roll.disabled = false;
        roll.innerHTML = 'Passa il turno!';
        roll.addEventListener('click', () => { 
            // se il saldo e' negativo non posso terminare il turno
            if (giocatori[0].saldo < 0){
                resolve(false);
            } else {
                roll.disabled = true;
                roll.innerHTML = 'Lancia i dadi!';
                resolve(true);
            }
        }, {once: true} );
    });
}

// funzione per simulare un'attesa
function waitASec(a){
    return new Promise((resolve) => {
        setTimeout( () => { resolve(); }, a );
    })
}


class Gioco{

    static quanti = 0;

    constructor(){

        // massimo 1 gioco contemporaneamente
        if (Gioco.quanti > 0)
            return;
        Gioco.quanti++;

        this.round = 0;

        // inizializzo il gioco
        // 1. inizializzo il menu
        initChat();

        // 2. inizializzo il layout della finestra
        initMessageBox();

        this.turno = 0;
    }

    abilitaBottoni(){
        const bancarotta = document.getElementById('bancarotta');
        const nuovaOfferta = document.getElementById('nuova-offerta');

        bancarotta.disabled = 0;
        nuovaOfferta.disabled = 0;
        bancarotta.innerHTML = 'Dichiara bancarotta';
        bancarotta.onclick = () => {
            if (confirm("Sei sicuro di voler dichiarare bancarotta?"))
                giocatori[0].dichiaraBancarotta();
        }
    }

    disabilitaBottoni(){
        const bancarotta = document.getElementById('bancarotta');
        const nuovaOfferta = document.getElementById('nuova-offerta');
        nuovaOfferta.disabled = 1;

        bancarotta.disabled = 0;
        bancarotta.innerHTML = 'Torna alla homepage';
        bancarotta.onclick = showHome;
    }

    // inizializzazione del gioco
    init(){

        // disabilito i bottoni
        this.disabilitaBottoni();

        this.turno = 0;

        // inizializzo nomi e li aggiorno a video
        npc = shuffleArray(npc);
        for (let i = 1; i < numPlayer; i++){
            const name = document.getElementById('player-name-' + i);
            name.innerHTML = npc[i];
        }

        // inizializzo i giocatori
        for (let p of giocatori)
            p.init();


        // inizializzo le caselle
        for (let c of scenario){
            c.rimuoviProprieta();
            c.init();
        }

        // inizializzo le offerte
        // rimuovo le offerte a video
        Offerta.id = 0;
        offerte = [];
        let offerContainers = document.querySelectorAll('.offer-container');
        const offerDisplay = document.getElementById('offer-display');
        for (let o of offerContainers){
            offerDisplay.removeChild(o);
        }

        // inizializzo make offerr
        nomeMakeOffer();

        // inizializzo log
        const log = document.getElementById('log');
        log.innerHTML = '';

    }

    winCondition(){
        // devo controllare che tutti i giocatori siano in bancarotta tranne il player
        if (giocatori[1].bancarotta && giocatori[2].bancarotta && giocatori[3].bancarotta && giocatori[4].bancarotta)
            return true;
        
        return false;
    }

    async start(){

        // codice di verifica
        let v;
        
        while (1){
            // inizializzo il gioco
            this.init();
    
            // mi metto in attesa che il giocatore prema su avvia gioco
            await waitStart();
    
            // ottengo il codice del gioco
            v = await verificationCode();


            // abilito i bottoni
            this.abilitaBottoni();

            while (1){
    
                // controllo che il giocatore abbia vinto o che abbia dichiarato bancarotta
                if (giocatori[0].bancarotta || this.winCondition()){
                    break;
                }
    
                // ottengo un riferimento al player che deve giocare
                let id = this.turno%numPlayer;
                //debug
                //console.log("turno " + this.turno + ' tocca a ' + giocatori[id].username);
                
                let player = giocatori[id];
    
                // controllo se il giocatore e' in bancarotta
                if (player.bancarotta){
                    this.turno++;
                    continue;
                }
    
                let dice1, dice2;

                let oldPosition = player.posizione;
    
                // 0. lancio dei dadi
                if (id == 0){
                    [dice1, dice2] = await waitForDice();
                } else {
                    await waitASec(Math.floor(Math.random() * 200));
                    [dice1, dice2] = randomDice();
                }
    
                dice1 = Number(dice1);
                dice2 = Number(dice2);
    
                // 0. controllo che il giocatore non sia in prigione
                if (player.prigione){

                    // se ho gia' fatto 3 turni in prigione esci
                    if (player.prigione == 4){
                        player.prigione = 0;
                    } else {
                        // se il giocatore ha fatto doppio esce normalmente
                        if (dice1 == dice2){
                            player.prigione = 0;
                        } else {
                            // se il giocatore non ha fatto doppio allora salta il turno
                            player.prigione++;
                            this.turno++;
        
                            if (id){
                                await waitASec(1000);
                                continue;
                            } else {
                                await waitForEndTurn();
                                continue;
                            }
                        }
                    }
                }
    
                // 1. spostamento della casella
                player.muoviGiocatore(dice1 + dice2);
    
                // 2. controllo se sono passato dal via
                let newPosition = player.posizione;
                //debug
                //console.log(oldPosition + ' + ' + (dice1 + dice2) + ' % 40 = ' + newPosition);
    
                if (newPosition < oldPosition){
                    player.ricevi(200);
                    player.updateSaldo();
                }
    
    
                // 3. controllo su che casella mi trovo
                let casella = scenario[newPosition];
                let ritorno = casella.move(id);
    
    
                // 4. se si tratta di un npc gli diamo la possibilita di fare altre mosse come acquistare case, vendere case, fare offerte ed accettare offerta
                if (id){
                    player.ai.compraCasa();
                    player.ai.faiOfferta(this.turno);
                    player.ai.accettaOfferta();
                }
    
                // il turno non puo' terminare se il saldo e' negativo
                if (!id){
                    while (1){
                        let bool = await waitForEndTurn();
                        if (bool)
                            break;
                        alert("Non puoi terminare il turno con saldo negativo");
                    }
                } else {
                    // neanche il turno degl npc puo' terminare con saldo negativo
                    if (player.saldo < 0){
                        // provo a vendere qualcosa
                        let a = player.ai.sell(Math.abs(player.saldo));
                        // se non riesce a vendere niente allora dichiara bancarotta
                        if (a == -1)
                            player.dichiaraBancarotta();
                    }
                    await waitASec(1000);
                }
    
    
                // se il giocatore ha fatto doppio allora ripeti il turno
                if (dice1 != dice2)
                    this.turno++;
                else{
                    printMessage(player.username + ' ha fatto doppio quindi lancia di nuovo');
                }
    
    
                // alla fine del turno controllo se il player e' andato in bancarotta
                if (giocatori[0].bancarotta)
                    break;
            }

            // disabilito i bottoni
            this.disabilitaBottoni();

    
            let win = ''
            // il gioco e' finito, dobbiamo verificare se il giocatore ha vinto oppure no
            if (giocatori[0].bancarotta){
                win = 'Hai perso!';
            } else {
                win = 'Hai vinto!';

                // se il giocatore ha vinto allora dobbiamo aggiornare il suo punteggio
                let punteggio = calcolaValore();

                // adesso inviamo il punteggio
                inviaPunteggio(punteggio,v);
            }

            // chiediamo al giocatore se vuole tornare alla homepage
            if (confirm(win + " Vuoi tornare alla homepage?")){
                showHome();
            } else {
                ;   // lascia che il giocatore giochi una nuova partita
            }
        }
    }
}

function calcolaValore(){
    // calcolo il valore accumulato dal giocatore
    let valore = giocatori[0].saldo;

    for (let p of giocatori[0].proprieta)
        valore += Number(p.prezzo[0]);

    return valore;
}

// funzione per avviare un gioco e ricevere un verification code
async function verificationCode(){

    return new Promise((resolve) => {

        const data = 'username=' + giocatori[0].username;

        let request = new XMLHttpRequest();
        
        request.open("post", "../php/game.php");
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onload = () => {
            const response = JSON.parse(request.response);
            resolve(response['id']);
        }
        request.onerror = (error) => console.log(error);
        request.send(data);
    });
}

// funzione per inviare il punteggio
function inviaPunteggio(p,id){

    // caricamento del punteggio
    const data = 'punteggio=' + p + '&id=' + id;
    
    let request = new XMLHttpRequest();
    
    request.open("post", "../php/punteggio.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    request.onload = () => {
        const response = JSON.parse(request.response);
    };

    request.onerror = (event) => console.log(event);
    request.send(data);
}


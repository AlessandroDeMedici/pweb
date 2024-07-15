// definizione dell'oggetto giocatori
// e dell'array globale dei giocatori
let mainPlayer = 0;
let numPlayer = 5;
let npc = ['Marco','Giovanni','Sandro','Aldo','Luca', 'Silvia', 'Giulia','Eleonora','Giacomo'];

class Giocatore{

    constructor(username){

        // sistemo la pedina
        this.pedina = document.createElement('img');
        this.pedina.className = 'giocatore';
        this.pedina.src = '/media/player/pedina_' + giocatori.length + '.svg';
        this.pedina.alt = 'pedina_' + giocatori.length;

        // do un id al giocatore
        this.id = 'giocatore-' + giocatori.length;
        this.numId = giocatori.length;

        // username casuale
        this.username = username;

        // saldo
        this.saldo = 1500;

        // campo significativo solo per gli npc
        if (this.numId){
            this.ai = new IA(this);
        }

    }

    // inizializzazione giocatore
    init(){
        // inseririsco il giocatore nella prima casella
        let casella = document.getElementById('contenitore-giocatori-0');
        casella.appendChild(this.pedina);

        // inizializzo posizione
        this.posizione = 0;

        // inizializzo saldo
        this.saldo = 1500;
        this.updateSaldo();

        // inizializzo proprieta
        this.proprieta = [];

        // prigione
        this.prigione = 0;

        // inizializzo le offerte
        this.offerte = [];

        this.bancarotta = 0;

        if (this.numId > 0)
            this.username = npc[this.numId];
    }

    // sposto il giocatore nella casella i caselle avanti e ritorniamo l'indice della casella
    muoviGiocatore(i){
        if (i > 12){
            console.log('movimento errato');
            return;
        }

        i = (i + this.posizione) % 40;
        let newdiv = document.getElementById('contenitore-giocatori-' + i);
        newdiv.appendChild(this.pedina);

        this.posizione = i;

        return i;
    }

    // funzione per spostare il giocatore in una casella specifica
    muoviGiocatoreAbs(i){
        if (i < 0 || i > 39){
            console.log('movimento errato');
            return;
        }

        let newdiv = document.getElementById('contenitore-giocatori-' + i);
        newdiv.appendChild(this.pedina);

        this.posizione = i;

        return i;
    }

    // funzione per pagare alla banca
    paga(i){
        this.saldo -= i;
    }

    // funzione per ricevere dalla banca
    ricevi(i){
        this.saldo += i;
    }

    // funzione per pagare un altro giocatore
    pagaGiocatore(giocatore,i){
        this.paga(i);
        giocatore.ricevi(i);
    }

    // funzione per ricevere soldi da tutti i giocatori
    riceviGiocatori(valore){
        for (let i in giocatori){
            if (giocatori[i] == this)
                continue;
            giocatori[i].pagaGiocatore(this,valore);
        }
    }

    // funzione per pagare i soldi a tutti gli altri giocatori
    pagaGiocatori(valore){
        for (let i in giocatori){
            if (giocatori[i] == this)
                continue;
            this.pagaGiocatore(giocatori[i],valore);
        }
    }

    // funzione che ti manda in prigione senza passare dal via
    goToPrison(){
        // turni passati in prigione
        let div = document.getElementById('prigione');
        div.appendChild(this.pedina);
        this.prigione = 1;

    }

    // funzione per pagare la manutenzione sugli alberghi e sulle case possedute
    // in base al costo per casa e per albergo
    manutenzione(costoCasa,costoAlbergo){
        let numeroCase = 0;
        let numeroAlberghi = 0;
        for (let i in this.caselle){
            numeroCase += this.caselle[i].case();
            numeroAlberghi += this.caselle[i].alberghi();
        }

        this.paga(numeroCase * costoCasa + numeroAlberghi * costoAlbergo);
    }

    // funzione che aggiorna a video il saldo del giocatore
    updateSaldo(){
        const saldo = document.getElementById('saldo-giocatore-' + this.numId);
        saldo.innerHTML = this.saldo;
    }

    // funzione per dichiarare bancarotta ed aggiornare a video il saldo
    dichiaraBancarotta(){
        console.log(this.username + ' ha dichiarato bancarotta');
        this.bancarotta = 1;
        const saldo = document.getElementById('saldo-giocatore-' + this.numId);
        saldo.innerHTML = "BANCAROTTA";


        // quando un giocatore dichiara bancarotta tutte le sue proprieta vengono liberate
        for (let p of this.proprieta)
            p.free();

        this.proprieta = [];
    }
}

// inizializzo l'array dei giocatori
giocatori = [];
function initGiocatori(){
    // inizializzo l'array dei giocatori
    giocatori.push(new Giocatore(username));
    giocatori.push(new Giocatore(npc[0]));
    giocatori.push(new Giocatore(npc[1]));
    giocatori.push(new Giocatore(npc[2]));
    giocatori.push(new Giocatore(npc[3]));
}
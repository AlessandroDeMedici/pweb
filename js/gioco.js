class Giocatore{

    // numero dei giocatori
    static numGiocatori = 0;

    // array dei giocatori
    static giocatori = new Array();

    constructor(){

        Giocatore.giocatori.push(this);
        // sistemo la pedina
        this.pedina = document.createElement('img');
        this.pedina.className = 'giocatore';
        this.pedina.src = '/media/pedina.svg';

        // do un id al giocatore
        this.playerID = 'giocatore-' + ++Giocatore.numGiocatori;

        // inseririsco il giocatore nella prima casella
        let casella = document.getElementById('contenitore-giocatori-0');
        casella.appendChild(this.pedina);

        // tengo traccia della posizione
        this.posizione = 0;

        // saldo del giocatore
        this.saldo = 1500;

        // caselle possedute dal giocatore
        this.caselle = [];
    }

    // sposto il giocatore nella casella i-esima
    muoviGiocatore(i){
        if (i >= 40 || i < 0){
            console.log('movimento errato');
            return;
        }

        let newdiv = document.getElementById('contenitore-giocatori-' + i);
        newdiv.appendChild(this.pedina);

        this.posizione = i;
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

    goToPrison(){

        // turni passati in prigione
        let div = document.getElementById('prigione');
        div.appendChild(this.pedina);
        this.posizione = 'prigione';

        this.turni = 0;
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

}


class Carta{
    constructor(nome,descrizione,effetto,valore, valore2 = null){
        this.nome = nome;
        this.descrizione = descrizione;
        this.effetto = effetto;
        this.valore = valore;
        this.valore2 = valore2;
    }

    pesca(giocatore){
        // controllo sugli input
        if (!giocatore){
            console.log('giocatore non valido');
            return;
        }

        // controllo sull'effetto della carta
        if (!this.effetto || this.effetto == ''){
            console.log('effetto della carta non valido');
            return;
        }
        
        if (this.effetto == 'MOVE_ABSOLUTE'){
            giocatore.muoviGiocatore(this.valore);
            return;
        } else if (this.effetto == 'MOVE_RELATIVE'){
            giocatore.muoviGiocatore(giocatore.posizione + this.valore);
        } else if (this.effetto == 'PAY'){
            giocatore.paga(this.valore);
            return;
        } else if (this.effetto == 'PRISON'){
            giocatore.goToPrison();
        } else if (this.effetto == 'JOLLY'){
            // conferisci al giocatore la carta jolly
        } else if (this.effetto == 'GIFT'){
            giocatore.ricevi(this.valore);
        } else if (this.effetto == 'MANTEINANCE'){
            giocatore.manutenzione(this.valore,this.valore2);
        } else if (this.effetto == 'TAKE'){
            giocatore.riceviGiocatori(this.valore);
        } else if (this.effetto == 'GIVE'){
            giocatore.pagaGiocatori(this.valore);
        }

        // penso a questo punto di aver fatto tutti gli effetti possibili
    }
}


class Mazzo{

    constructor(carte){
        // gli devo dare in ingresso un array di carte
        this.carte = carte;
        // a quale carta siamo arrivati ad estrarre
        this.indice = 0;
    }

    // funzione per mescolare le carte
    mescola(){
        let rand, temp, i;

        for (i = this.carte.length - 1; i > 0 ; i--){
            rand = Math.floor((i + 1) * Math.random());
            temp = this.carte[rand];
            this.carte[rand] = this.carte[i];
            this.carte[i] = temp;
        }
    }

    // funzione per pescare una carta
    pesca(giocatore){
        // controllo sugli input
        if (!giocatore){
            console.log('giocatore non valido');
            return;
        }

        // devo controllare che possiamo estrarre ancora carte
        if (indice >= carte.length){
            console.log('mazzo finito, impossibile estrarre altre carte');
            return;
        }

        // estraggo la carta
        this.carte[indice++].pesca(giocatore);
    }
}


class Gioco{

    constructor(probabilita,imprevisti,giocatori,caselle){
        // devo passare in ingresso al gioco
        // le probabilita
        // gli imprevisti
        // i giocatori nell'ordine in cui giocheranno
        // le caselle
        this.probabilita = probabilita;
        this.imprevisti = imprevisti;
        this.giocatori = giocatori;
        this.caselle = caselle;

        // devo inizializzare il gioco
    }

    // facciamo un turno del giocatore
}



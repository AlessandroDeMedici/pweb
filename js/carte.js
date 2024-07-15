
// file che contiene la definizione dell'oggetto carta ed i metodi associati
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
            //debug
            //console.log('giocatore non valido');
            return;
        }

        // controllo sull'effetto della carta
        if (!this.effetto || this.effetto == ''){
            //debug
            //console.log('effetto della carta non valido');
            return;
        }
        
        if (this.effetto == 'MOVE_ABSOLUTE'){
            let j = giocatore.posizione;
            let i = giocatore.muoviGiocatoreAbs(this.valore);

            if (i < j){
                giocatore.ricevi(200);
                giocatore.updateSaldo();
            }

            // bisogna fare la mossa corrispondente alla nuova posizione
            let casella = scenario[i];
            //debug
            //console.log(this.valore);
            casella.move(giocatore.numId,Math.abs(this.valore));

        } else if (this.effetto == 'MOVE'){
            let j = giocatore.posizione;
            let i = giocatore.muoviGiocatore(this.valore);

            if (i < j){
                giocatore.ricevi(200);
                giocatore.updateSaldo();
            }

            // bisogna fare la mossa corrispondente alla nuova posizione
            let casella = scenario[i];
            casella.move(giocatore.numId,Math.abs(this.valore));

        } else if (this.effetto == 'PAY'){
            giocatore.paga(this.valore);
            giocatore.updateSaldo();
            return;
        } else if (this.effetto == 'PRISON'){
            giocatore.goToPrison();
        } else if (this.effetto == 'GIFT'){
            giocatore.ricevi(this.valore);
            giocatore.updateSaldo();
        } else if (this.effetto == 'MANTEINANCE'){
            giocatore.manutenzione(this.valore,this.valore2);
            giocatore.updateSaldo();
        } else if (this.effetto == 'GIVE'){
            giocatore.pagaGiocatori(this.valore);
            giocatore.updateSaldo();
        } else {
            ;
        }
    }
}

// dichiaro mazzo di imprevisti e probabilita
let imprevisti = [];
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino alla Stazione Sud, se passate dal via ritirate $200', 'MOVE_ABSOLUTE', 5));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino fino a Via Marco Polo, se passate dal via ritirate $200', 'MOVE_ABSOLUTE', 21));
imprevisti.push(new Carta('Imprevisti', 'Arretrate di 3 caselle', 'MOVE', -3));
imprevisti.push(new Carta('Imprevisti', 'Avete preso una multa per eccesso di velocità, pagate $15', 'PAY', 15));
imprevisti.push(new Carta('Imprevisti', 'Andate in prigione e senza passare dal via, non ritirate $200', 'PRISON'));
imprevisti.push(new Carta('Imprevisti', 'Maturano i fondi sull\'assicurazione sulla vita: ritirate $50', 'GIFT', 50));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino a Viale dei Giardini', 'MOVE_ABSOLUTE',37));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino a Via Marco Polo, se passate dal via ritirate $200', 'MOVE_ABSOLUTE', 21));
imprevisti.push(new Carta('Imprevisti', 'Siete stati eletti amministratore di condominio, pagate a ciascun giocatore $50', 'GIVE', 50));
imprevisti.push(new Carta('Imprevisti', 'Eseguite lavori di manutenzione su tutte le vostre proprietà, per ogni casa pagate $25, per ogni albergo pagate $100', 'MAINTENANCE',25,100));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino al Via! Ritirate $200', 'MOVE_ABSOLUTE', 0));
imprevisti.push(new Carta('Imprevisti', 'Maturano i vostri investimenti, ritirate $150', 'GIFT', 150));
let indiceImprevisti = Math.floor(Math.random() * imprevisti.length);



let probabilita = [];
probabilita.push(new Carta('Probabilita','Ereditate delle proprietà da un lontano parente, ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Avanzate fino al Via! Ritirate $200', 'MOVE_ABSOLUTE', 0));
probabilita.push(new Carta('Probabilita','Avete vinto la lotteria! Ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Ricevete le parcelle della tintoria, pagate $100', 'PAY', 100));
probabilita.push(new Carta('Probabilita','La banca riconosce un errore nel vostro conto, ritirate $200', 'GIFT', 200));
probabilita.push(new Carta('Probabilita','Maturano dei vostri investimenti, ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Versate il rimanente delle rette universitarie dei vostri figli, pagate $200', 'PAY', 200));
probabilita.push(new Carta('Probabilita','Ricevete la parcella del dottore, pagate $50', 'PAY', 50));
probabilita.push(new Carta('Probabilita','Maturano gli interessi della vostra assicurazione sulla vita. Ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Andate in prigione senza passare dal via, non ritirate $200', 'PRISON'));
let indiceProbabilita = Math.floor(Math.random() * probabilita.length);


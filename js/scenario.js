

// le keyword probabilita, imprevisti e default sono riservate agli imprevisti, le probabilita
// e le caselle che hanno un comportamente di default nel tabellone
// nome -> nome della proprieta
// descrizione -> descrizione della proprieta
// gruppo       -> gruppo a cui appartiene la proprieta
// colore       -> colore della proprieta
// prezzo       -> array con i costi di (in ordine) {proprieta,casa,albergo}
// pedaggio     -> array con i costi dei pedaggi (in ordine) {proprieta, 1 casa, 2 case, 3 case, 4 case, albergo}
// ipoteca      -> valore ipotecario

let contenitoreProprieta;



class Casella{
    constructor(nome, descrizione = null, gruppo = null,colore = null, prezzo = null, pedaggio = null, ipoteca = null, immagine = null){
        if (nome != 'probabilita' && nome != 'imprevisti' && nome != 'default'){
            this.nome = nome;
            this.descrizione = descrizione;
            this.gruppo = gruppo;
            this.colore = colore;
            this.prezzo = prezzo;
            this.pedaggio = pedaggio;
            this.ipoteca = ipoteca;
            this.immagine = immagine;
        }
        this.nome = nome;
    }

    // funzione che ritorna la stringa da inserire nella descrizione delle proprieta
    makeStringa(){
        let stringa = "AFFITTO $" + this.pedaggio[0] + '\n';
        stringa += "Con 1 casa $" + this.pedaggio[1] + '\n';
        for (let i = 2; i <= 4; i++){
            stringa += "Con " + i + ' case $' + this.pedaggio[i] + '\n';
        }
        stringa += "Con albergo $" + this.pedaggio[5] + '\n';
        stringa += 'Valore ipotecario $' + this.ipoteca + '\n';
        stringa += "Le case costano $" + this.prezzo[1] + '\n';
        stringa += "L'albergo costa $" + this.prezzo[2] + '\n';

        return stringa;
    }

    stampaProprieta(){
        let casella = document.createElement('div');
        casella.className = 'carta';
        casella.id = this.nome;

        let proprieta = document.createElement('details');
        proprieta.className = 'proprieta';

        let titolo = document.createElement('summary');
        titolo.className = 'titolo';
        titolo.style.backgroundColor = this.colore;
        titolo.appendChild(document.createTextNode(this.nome));

        // aggiungo la descrizione alla proprieta
        let descrizione = document.createElement('div');
        descrizione.className = 'descrizione-contenitore';

        let stringa = this.makeStringa();
        stringa = stringa.split('\n');
        for (let line in stringa){
            let p = document.createElement('p');
            p.className = 'descrizione';
            p.appendChild(document.createTextNode(stringa[line]));
            descrizione.appendChild(p);
        }

        proprieta.appendChild(titolo);
        proprieta.appendChild(descrizione);
        casella.appendChild(proprieta);
        contenitoreProprieta.appendChild(casella);
    }
}


let casellaProva = new Casella('nome di prova','descrizione di prova',1,'lightblue',[100,150,200],[50,100,200,300,400,600],[50]);


// INIT
document.addEventListener('DOMContentLoaded', () => {
    contenitoreProprieta = document.getElementById('contenitore-proprieta');
    casellaProva.stampaProprieta();
    casellaProva.stampaProprieta();
    casellaProva.stampaProprieta();
    casellaProva.stampaProprieta();
    casellaProva.stampaProprieta();
    casellaProva.stampaProprieta();
})
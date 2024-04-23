

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
        casella.draggable = true;
        casella.ondragover = (e) => {
            e.preventDefault();
        }
        casella.ondragend = endDrag;


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

    inserisiProprieta(i){
        if (!(i % 10) || i < 0 || i > 39){
            // questo numero di casella non va bene
            console.log("tentato inserimento di proprieta in casella non valida: ",casella);
            return;
        }

        // ottengo un riferimento alla casella ed alla barra corrispondente
        let casella = document.getElementById('casella-' + casella);
        let barra = document.getElementById('barra-' + id);
        
    }
}


// GESTIONE DEL DRAG

// scambio l'elemento corrente con quello nel quale il mouse si trova
function endDrag(e){
    let dragDiv = e.target;
    e.preventDefault();

    let parentRect = contenitoreProprieta.getBoundingClientRect();
    // DEBUG
    //console.log('Il padre ha posizione: ' + parentRect.left + ' ' + parentRect.top);

    let x = e.clientX;
    let y = e.clientY;

    // cerco se il puntatore si trova dentro una div
    for (let c in contenitoreProprieta.children){
        let div = contenitoreProprieta.children[c];


        if (!div.getBoundingClientRect)
            continue;
        
        let dropRect = div.getBoundingClientRect();
        // devo sistemarlo in base alla dimensione dell'oggetto
        // dropRect.left -= parentRect.left;
        // dropRect.top -= parentRect.top;

        // DEBUG
        //console.log("posizione mouse: " + x + ' ' + y);
        //console.log('left right top bottom ' + c + ': ' + (Math.floor(dropRect.left)) + ' ' + (Math.floor(dropRect.right)) + ' ' + (Math.floor(dropRect.top)) + ' ' + (Math.floor(dropRect.bottom)));        
        if ((x >= Math.floor(dropRect.left)) && (x <= Math.floor(dropRect.right)) && (y >= Math.floor(dropRect.top)) && (y <= Math.floor(dropRect.bottom))){
                //console.log("faccio lo switch con la " + c);
                // allora posso effettuare lo scambio e fare return
                if (div == dragDiv){
                    //console.log("stessa posizione di prima");
                    return;
                }
                else {
                    // faccio lo switch delle div
                    let next1 = div.nextSibling;
                    let next2 = dragDiv.nextSibling;
                    if (next1){
                        // esiste una casella dopo
                        contenitoreProprieta.insertBefore(dragDiv,next1);
                    } else {
                        contenitoreProprieta.appendChild(dragDiv);
                    }
                    // adesso devo spostare il secondo
                    contenitoreProprieta.insertBefore(div,next2);
                }
                return;
        }
    }
    // a questo punto non ero dentro nessuna
}



let casellaProva = new Casella('Ingegneria Polo ','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50]);

// INIT
document.addEventListener('DOMContentLoaded', () => {
    contenitoreProprieta = document.getElementById('contenitore-proprieta');
    contenitoreProprieta.className = 'container';

    // prova
    for (let i = 0; i < 10; i++){
        casellaProva.nome = "Ingegeria Polo " + i;
        casellaProva.colore = decimalToRgb(((i + 1) * 2000));
        //console.log(decimalToRgb(i*2000));
        casellaProva.stampaProprieta();
    }
})


// le keyword probabilita, imprevisti e default sono riservate agli imprevisti, le probabilita
// e le caselle che hanno un comportamente di default nel tabellone
// nome -> nome della proprieta
// descrizione -> descrizione della proprieta
// gruppo       -> gruppo a cui appartiene la proprieta
// colore       -> colore della proprieta
// prezzo       -> array con i costi di (in ordine) {proprieta,casa,albergo}
// pedaggio     -> array con i costi dei pedaggi (in ordine) {proprieta, 1 casa, 2 case, 3 case, 4 case, albergo}
// ipoteca      -> valore ipotecario


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
        property.appendChild(casella);
    }

    inserisiProprieta(i){
        if (!(i % 10) || i < 0 || i > 39){
            // questo numero di casella non va bene
            console.log("tentato inserimento di proprieta in casella non valida: ",i);
            return this;
        }

        // ottengo un riferimento alla casella ed alla barra corrispondente
        let casella = document.getElementById('casella-' + i);
        let barra = document.getElementById('barra-' + i);

        // se questa casella e' probabilita o imprevisti allora devo
        // aggiungerla nel modo corrispondente
        if (this.nome == 'probabilita' || this.nome == 'imprevisti'){
            let text = document.createElement('div');
            text.className = this.nome;
            text.appendChild(document.createTextNode(this.nome == 'probabilita' ? '?' : '!'));

            // la casella va inserita con l'orientamento corretto
            if (i > 0 && i < 10){
                barra.style.display = 'none';
                casella.rowSpan = 2;
                text.style.transform = 'rotate(180deg)';
                casella.appendChild(text);
            } else if (i > 10 && i < 20) {
                barra.style.display = 'none';
                casella.colSpan = 2;
                text.style.transform = 'rotate(-90deg)';
                casella.appendChild(text);
            } else if (i > 20 && i < 30) {
                casella.style.display = 'none';
                barra.rowSpan = 2;
                barra.appendChild(text);
                barra.style.backgroundColor = '#bfdbae';
            } else if (i > 30 && i < 40) {
                barra.style.display = 'none';
                casella.colSpan = 2;
                text.style.transform = 'rotate(90deg)';
                casella.appendChild(text);
            }
            return this;
        }

        // le caselle con immagine hanno un inserimento particolare
        if (this.immagine){
            return this;
        }

        // casella con solo testo
        barra.style.backgroundColor = this.colore;
        let text = document.createElement('div');
        let text1 = document.createElement('p');
        text1.className = 'nome-casella';
        text1.appendChild(document.createTextNode(this.nome));
        let text2 = document.createElement('p');
        text2.className = 'prezzo-casella';
        text2.appendChild(document.createTextNode(this.prezzo[0] + '$'));
        text.appendChild(text1);
        text.appendChild(text2);
        text.className = 'testo-casella';
        // la casella va inserita con l'orientamento corretto
        if (i > 0 && i < 10){
            text.style.transform = 'rotate(180deg)';
            casella.appendChild(text);
        } else if (i > 10 && i < 20) {
            text.style.transform = 'rotate(-90deg)';
            casella.appendChild(text);
        } else if (i > 20 && i < 30) {
            casella.appendChild(text);
        } else if (i > 30 && i < 40) {
            text.style.transform = 'rotate(90deg)';
            casella.appendChild(text);
        }
        return this;
    }
}


// GESTIONE DEL DRAG

// scambio l'elemento corrente con quello nel quale il mouse si trova
function endDrag(e){
    let dragDiv = e.target;
    e.preventDefault();

    let parentRect = property.getBoundingClientRect();
    // DEBUG
    //console.log('Il padre ha posizione: ' + parentRect.left + ' ' + parentRect.top);

    let x = e.clientX;
    let y = e.clientY;

    // cerco se il puntatore si trova dentro una div
    for (let c in property.children){
        let div = property.children[c];


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
                        property.insertBefore(dragDiv,next1);
                    } else {
                        property.appendChild(dragDiv);
                    }
                    // adesso devo spostare il secondo
                    property.insertBefore(div,next2);
                }
                return;
        }
    }
    // a questo punto non ero dentro nessuna
}

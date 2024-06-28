

// le keyword probabilita, imprevisti e default sono riservate agli imprevisti, le probabilita
// e le caselle che hanno un comportamente di default nel tabellone
// nome -> nome della proprieta
// descrizione -> descrizione della proprieta
// gruppo       -> gruppo a cui appartiene la proprieta
// colore       -> colore della proprieta
// prezzo       -> array con i costi di (in ordine) {proprieta,casa,albergo}
// pedaggio     -> array con i costi dei pedaggi (in ordine) {proprieta, 1 casa, 2 case, 3 case, 4 case, albergo}
// ipoteca      -> valore ipotecario
// immagine     -> immagine della casella
let tabellone;

class Casella{

    // contenitore delle proprieta
    static property;
    static messageBox;
    static descrizioneMessageBox;

    static init(property){
        Casella.property = property;
        [Casella.messageBox,Casella.descrizioneMessageBox,Casella.titoloMessageBox] = tabellone.getMessageBox();
    }

    constructor(nome, descrizione = null, gruppo = null,colore = null, prezzo = null, pedaggio = null, ipoteca = null, immagine = null){
        this.nome = nome;
        this.descrizione = descrizione;
        this.gruppo = gruppo;
        this.colore = colore;
        this.prezzo = prezzo;
        this.pedaggio = pedaggio;
        this.ipoteca = ipoteca;
        this.immagine = immagine;
        
        // la proprieta e' inizialmente priva di case e di alberghi
        this.casa = [];
        this.albergo = null;
        this.casella = null;
    }

    // funzione che ritorna la stringa da inserire nella descrizione delle proprieta
    makeStringa(){
        if (this.nome == 'probabilita')
            return null
        else if (this.nome == 'imprevisti')
            return null
        else if (this.nome.includes('Stazione')){
            let stringa = "AFFITTO $" + this.pedaggio[0] + "\n";
            stringa += 'Con 2 stazioni $' + this.pedaggio[1] + '\n';
            stringa += 'Con 3 stazioni $' + this.pedaggio[2] + '\n';
            stringa += 'Con 4 stazioni $' + this.pedaggio[3] + '\n';
            return stringa;
        }
        else if (this.nome.includes('Tassa')){
            return this.nome;
        }
        else if (this.nome.includes('Società')){
            let stringa = "Con 1 società $2*lancio\n";
            stringa += "Con 2 società $10*lancio\n";
            return stringa;
        }
        else if (this.nome.includes('Via')){
            return "Ogni volta che passi dal via ritira $200";
        }
        else if (this.nome.includes('In prigione!')){
            return "Quando passi da questa casella vai in prigione senza passare dal via!";
        }
        else if (this.nome.includes('Prigione')){
            return "Quando passi da questa casella non sei in prigione. Se invece sei finito in prigione, all'inizio del turno lancia i dadi, se fai doppio allora esci di prigione altrimenti salta il turno. Rimani in prigione per un massimo di 3 turni, se non fai doppio entro 3 turni paga $50. Puoi sempre pagare $50 all'inizio del turno per uscire di prigione"
        }
        else if (this.nome.includes('parcheggio gratuito')){
            return "Riposati, parcheggio gratuito";
        }
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


    rimuoviProprieta(){
        if (!this.casella){
            console.log('impossibile rimuovere la casella');
            return;
        }

        Casella.property.removeChild(this.casella);
        this.casella = null;
    }

    
    stampaProprieta(){

        // controllo che la casella non sia gia inserita
        if (this.casella){
            console.log("casella gia' presente");
            return;
        }

        // controllo che sia effettivamente una casella che si puo inserire
        if (!this.prezzo){
            console.log("non e' possibile acquistare questa casella");
            return;
        }

        // devo controllare che la casella non sia una stazione o una mensa (societa)
        // DA AGGIUNGERE


        let casella = document.createElement('div');
        this.casella = casella;
        casella.className = 'carta';
        casella.id = this.nome;
        casella.draggable = true;
        casella.ondragover = (e) => {
            e.preventDefault();
        }
        casella.ondragend = (e) => {
            // scambio l'elemento corrente con quello nel quale il mouse si trova
            let dragDiv = e.target;
            e.preventDefault();
        
            let parentRect = Casella.property.getBoundingClientRect();
            // DEBUG
            //console.log('Il padre ha posizione: ' + parentRect.left + ' ' + parentRect.top);
        
            let x = e.clientX;
            let y = e.clientY;
        
            // cerco se il puntatore si trova dentro una div
            for (let c in Casella.property.children){
                let div = Casella.property.children[c];
        
        
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
                                Casella.property.insertBefore(dragDiv,next1);
                            } else {
                                Casella.property.appendChild(dragDiv);
                            }
                            // adesso devo spostare il secondo
                            Casella.property.insertBefore(div,next2);
                        }
                        return;
                }
            }
            // a questo punto non ero dentro nessuna
        };


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
        Casella.property.appendChild(casella);
    }

    // funzione per inserire la proprieta nel tabellone
    inserisciProprieta(i){
        let playerContainer = document.createElement('div');
        playerContainer.className = 'contenitore-giocatori';
        playerContainer.id = 'contenitore-giocatori-' + i;
        playerContainer.onclick = () => {
            Casella.messageBox.style.visibility = 'visible';
            Casella.descrizioneMessageBox.innerHTML = this.makeDescrizione();
            Casella.titoloMessageBox.firstChild.nodeValue = this.nome;
        }

        // ottengo un riferimento alla casella ed alla barra corrispondente
        let casella = document.getElementById('casella-' + i);
        let barra = document.getElementById('barra-' + i);

        if (!(i % 10) || i < 0 || i > 39){
            // questo numero di casella va bene solo per inserire il contenitore
            casella.appendChild(playerContainer);
            return this;
        }

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
                casella.appendChild(playerContainer);
            } else if (i > 10 && i < 20) {
                barra.style.display = 'none';
                casella.colSpan = 2;
                text.style.transform = 'rotate(-90deg)';
                casella.appendChild(text);
                casella.appendChild(playerContainer);
            } else if (i > 20 && i < 30) {
                casella.style.display = 'none';
                barra.rowSpan = 2;
                barra.appendChild(text);
                barra.style.backgroundColor = '#bfdbae';
                barra.appendChild(playerContainer);
            } else if (i > 30 && i < 40) {
                barra.style.display = 'none';
                casella.colSpan = 2;
                text.style.transform = 'rotate(90deg)';
                casella.appendChild(text);
                casella.appendChild(playerContainer);
            }
            return this;
        }

        // le caselle con immagine hanno un inserimento particolare
        if (this.immagine){
            let text = document.createElement('div');
            text.className = 'testo-casella';

            let text1 = document.createElement('p');
            text1.appendChild(document.createTextNode(this.nome));
            text1.className = 'nome-casella';
            text.appendChild(text1);

            if (this.prezzo){
                let text2 = document.createElement('p');
                text2.appendChild(document.createTextNode(this.prezzo[0] + '$'));
                text2.className = 'prezzo-casella';
                text.appendChild(text2);
            }
            
            let img = document.createElement('img');
            img.className = 'immagine-casella';
            img.src = this.immagine;
            text.appendChild(img);
            
            // la casella va inserita con l'orientamento corretto
            if (i > 0 && i < 10){
                barra.style.display = 'none';
                casella.rowSpan = 2;
                text.style.transform = 'rotate(180deg)';
                casella.appendChild(text);
                casella.appendChild(playerContainer);
                text.style.height = '60px';
                text.style.width = '40px';
            } else if (i > 10 && i < 20) {
                barra.style.display = 'none';
                casella.colSpan = 2;
                text.style.transform = 'rotate(-90deg)';
                casella.appendChild(text);
                text.className += ' destra';
                casella.appendChild(playerContainer);
            } else if (i > 20 && i < 30) {
                casella.style.display = 'none';
                barra.id = casella.id;
                casella.id = '';
                text.style.width = '40px';
                text.style.height = '60px';
                barra.rowSpan = 2;
                barra.appendChild(text);
                barra.style.backgroundColor = '#bfdbae';
                barra.appendChild(playerContainer);
            } else if (i > 30 && i < 40) {
                barra.style.display = 'none';
                casella.colSpan = 2;
                text.style.transform = 'rotate(90deg)';
                casella.appendChild(text);
                text.className += ' sinistra';
                casella.appendChild(playerContainer);
            }
            return this;
        }

        // casella con solo testo
        barra.style.backgroundColor = this.colore;
        let text = document.createElement('div');

        let text1 = document.createElement('p');
        text1.appendChild(document.createTextNode(this.nome));
        text1.className = 'nome-casella';

        let text2 = document.createElement('p');
        text2.appendChild(document.createTextNode(this.prezzo[0] + '$'));
        text2.className = 'prezzo-casella';
        
        text.appendChild(text1);
        text.appendChild(text2);
        text.className = 'testo-casella';
        // la casella va inserita con l'orientamento corretto
        if (i > 0 && i < 10){
            text.style.transform = 'rotate(180deg)';
            casella.appendChild(text);
            casella.appendChild(playerContainer);
        } else if (i > 10 && i < 20) {
            text.style.transform = 'rotate(-90deg)';
            casella.appendChild(text);
            casella.appendChild(playerContainer);
        } else if (i > 20 && i < 30) {
            casella.appendChild(text);
            casella.appendChild(playerContainer);
        } else if (i > 30 && i < 40) {
            text.style.transform = 'rotate(90deg)';
            casella.appendChild(text);
            casella.appendChild(playerContainer);
        }
        return this;
    }

    // funzione che stampa la descrizione
    makeDescrizione(){
        if (this.nome == 'probabilita')
            return "Se passi da questa casella pesca una carta probabilità";
        else if (this.nome == 'imprevisti')
            return "Se passi da questa casella pesca una carta imprevisti";
        else {
            let stringa = this.makeStringa();
            stringa = stringa.split('\n');
            let temp = "";
            for (let line in stringa){
                temp += '<p>' + stringa[line] + '</p>';
            }
            return temp;
        }
    }


    // funzione che ritorna il numero di case sulla proprieta
    case(){
        return this.case.length;
    }

    // funzione che ritorna l'albergo se presente
    albergo(){
        if (albergo)
            return 1;
        else
            return 0;
    }
}


// array delle caselle sul tabellone
let scenario = []

// funzione per inizializzare lo scenario di gioco
function initTabellone(){
    // prima di aggiungere le caselle devo inizializzare le caselle
    Casella.init(property);

    // inizializzazione scenario
    scenario.push(new Casella('Via!','Ogni volta che passi dal via ritira $200 dalla banca'));
    scenario.push(new Casella('Vicolo Corto',null,1,'brown',[60,50,50],[2,10,30,90,160,250],30));
    scenario.push(new Casella('probabilita'));
    scenario.push(new Casella('Vicolo Stretto',null,1,'brown',[60,50,50],[4,20,60,180,320,450],30));
    scenario.push(new Casella('Tassa patrimoniale',null,null,null,null,[200],[100],'/media/patrimoniale.svg'));
    scenario.push(new Casella('Stazione Sud',null,9,null,[200],[25,50,100,200],100,'/media/treno.svg'));
    
    scenario.push(new Casella('Bastioni Gran Sasso',null,2,'lightblue',[100,50,50],[6,30,90,270,400,550],50));
    scenario.push(new Casella('imprevisti'));
    scenario.push(new Casella('Viale Monterosa',null,2,'lightblue',[100,50,50],[6,30,90,270,400,550],50));
    scenario.push(new Casella('Viale Vesuvio',null,2,'lightblue',[120,50,50],[8,40,100,300,450,600],60));
    
    scenario.push(new Casella('Prigione'));
    scenario.push(new Casella('Via Accademia',null,3,'pink',[140,100,100],[10,50,150,450,625,750],70));
    scenario.push(new Casella('Società elettrica',null,10,null,[150],[4,10],75,'/media/lampadina.svg'));
    scenario.push(new Casella('Corso Ateneo',null,3,'pink',[140,100,100],[10,50,150,450,625,750],70));
    scenario.push(new Casella('Piazza Università',null,3,'pink',[160,100,100],[12,60,180,500,700,900],80));
    
    scenario.push(new Casella('Stazione Ovest',null,9,null,[200],[25,50,100,200],100,'/media/treno.svg'));
    scenario.push(new Casella('Via Verdi',null,4,'orange',[180,100,100],[14,70,200,550,750,950],90));
    scenario.push(new Casella('probabilita'));
    scenario.push(new Casella('Corso Raffaello',null,4,'orange',[180,100,100],[14,70,200,550,750,950],90));
    scenario.push(new Casella('Piazza Dante',null,4,'orange',[200,100,100],[16,80,220,600,800,1000],100));

    scenario.push(new Casella('parcheggio gratuito'));
    scenario.push(new Casella('Via Marco Polo',null,5,'red',[220,150,150],[18,90,250,700,875,1050],110));
    scenario.push(new Casella('imprevisti'));
    scenario.push(new Casella('Corso Magellano',null,5,'red',[220,150,150],[18,90,250,700,875,1050],110));
    scenario.push(new Casella('Largo Colombo',null,5,'red',[240,150,150],[20,100,300,750,925,1100],120));

    scenario.push(new Casella('Stazione Nord',null,9,null,[200],[25,50,100,200],100,'/media/treno.svg'));
    scenario.push(new Casella('Viale Costantino',null,6,'yellow',[260,150,150],[22,110,330,800,975,1150],130));
    scenario.push(new Casella('Viale Traiano',null,6,'yellow',[260,150,150],[22,110,330,800,975,1150],130));
    scenario.push(new Casella('Società acqua potabile',null,10,null,[150],[4,10],75,'/media/rubinetto.svg'));
    scenario.push(new Casella('Piazza Giulio Cesare',null,6,'yellow',[280,150,150],[24,120,360,850,1025,1200],140));
    
    scenario.push(new Casella('In prigione!'));
    scenario.push(new Casella('Via Roma',null,7,'green',[300,200,200],[26,130,390,900,1100,1275],150));
    scenario.push(new Casella('Corso Impero',null,7,'green',[300,200,200],[26,130,390,900,1100,1275],150));
    scenario.push(new Casella('probabilita'));
    scenario.push(new Casella('Largo Augusto',null,7,'green',[320,200,200],[28,150,450,1000,1200,1400],160));

    scenario.push(new Casella('Stazione Est',null,9,null,[200],[25,50,100,200],100,'/media/treno.svg'));
    scenario.push(new Casella('imprevisti'));
    scenario.push(new Casella('Viale dei Giardini',null,8,'blue',[350,200,200],[35,175,500,1100,1300,1500],175));
    scenario.push(new Casella('Tassa di lusso',null,null,null,null,[100],[100],'/media/anello.svg'));
    scenario.push(new Casella('Parco della Vittoria',null,8,'blue',[400,200,200],[50,100,200,600,1400,1700,2000],200));

    for (let i in scenario){
        scenario[i].inserisciProprieta(i);
    }
}



function getCasella(nome){
    // funzione che ritorna un riferimento alla casella soltanto dal nome
    for (let p in scenario){
        let casella = scenario[p];
        if (casella.nome == nome)
            return casella;
    }
}

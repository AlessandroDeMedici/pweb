let boardDIM = 13;                  // dimensione complessiva del tabellone


class Board{

    static boardDIM = 13;
    static tavole = 0;
    static printed = 0;

    constructor(board){

        if (Board.tavole > 0){
            console.log("errore: non e' possibile creare un'ulteriore tabellone di gioco");
            return;
        }
        Board.tavole++;

        this.board = board;

        // l'interfaccia fornita e' quella di un array di 40 caselle
        // con la rispettiva barra
        this.caselle = [];
        this.barre = [];

        // un box per i messaggi
        this.messageBox = null;
        this.descrizioneMessageBox = null;
        this.titoloMessageBox = null;

        // una casella centrale
        this.centro = null;

        // la prigione
        this.prigione = null;

        // probabilita e imprevisti
        this.probabilita = null;
        this.imprevisti = null;
    }

    getMessageBox(){
        return [this.messageBox,this.descrizioneMessageBox,this.titoloMessageBox];
    }

    printBoard(){
        // controllo che la printboard non sia gia avvenuta
        if (Board.printed){
            console.log("impossibile stampare: tabellone gia' presente");
            return;
        }
        Board.printed = 1;
    
        // identificatore di riga
        let id = 0;
    
        // stampo il corpo della tabella
        let tbody = document.createElement('tbody');

        // riempio le righe della tabella
        for (let i = 0; i < boardDIM; i++){
            let tr = document.createElement('tr');
            tr.id = 'riga-' + i;
            tr.className = 'riga';
            for (let j = 0; j < boardDIM; j++){
                let td;
                // ci sono dei casi particolari:
                // gli angoli
                if ((i == 0 && j == 0) || (i == 0 && j == boardDIM - 2) || (i == boardDIM -2 && j == 0) || (i == boardDIM - 2 && j == boardDIM -2)){
                    td = document.createElement('td');
                    td.colSpan = 2;
                    td.rowSpan = 2;
                    td.id = 'casella-' + i + '-' + j;
                    td.className = 'casella';
                    tr.appendChild(td);
                    continue;
                } else if ((i < 2 && j < 2) || (i > boardDIM - 3 && j > boardDIM - 3) || (i > boardDIM - 3 && j < 2) || (i < 2 && j > boardDIM -3)){
                    continue;
                } else if (i == 2 && j == 2){
                    // aggiunge il centro
                    td = document.createElement('td');
                    td.colSpan = 9;
                    td.rowSpan = 9;
                    td.id = 'centro';
                    td.className = 'casella';
                    tr.appendChild(td);
                    this.centro = td;
    
                    // aggiunge una casella informativa
                    let div = document.createElement('div');
                    div.id = 'message-box';
                    div.style.visibility = 'hidden';
                    this.messageBox = div;
                    td.appendChild(this.messageBox);


                    let messageContainer = document.createElement('div');
                    div.appendChild(messageContainer);
                    messageContainer.id = 'message-container';

                    // creo il layout della casella informativa
                    let messageSubContainer = document.createElement('div');
                    messageSubContainer.id = 'message-sub-container';
                    messageContainer.appendChild(messageSubContainer);

                    let buttonContainer = document.createElement('div');
                    buttonContainer.className = 'message-button-container';
                    messageContainer.appendChild(buttonContainer);

                    // aggiungo i bottoni
                    {

                        // scritta per l'owner della proprieta
                        let owner = document.createElement('div');
                        owner.id = 'owner';
                        buttonContainer.appendChild(owner);

                        // creazione elementi
                        let compra = document.createElement('button');
                        let vendi = document.createElement('button');
                        let compraCasa = document.createElement('button');
                        let vendiCasa = document.createElement('button');

                        // testo a video
                        compra.innerHTML = "Compra proprieta'";
                        vendi.innerHTML = "Vendi proprieta'";
                        compraCasa.innerHTML = "Acquista casa";
                        vendiCasa.innerHTML = "Vendi casa";

                        // id
                        compra.id = 'compra';
                        vendi.id = 'vendi';
                        compraCasa.id = 'compra-casa';
                        vendiCasa.id = 'vendi-casa';

                        // aggiungi
                        buttonContainer.appendChild(compra);
                        buttonContainer.appendChild(vendi);
                        buttonContainer.appendChild(compraCasa);
                        buttonContainer.appendChild(vendiCasa);

                        // contenitore per stampare le case
                        let houseContainer = document.createElement('div');
                        houseContainer.id = 'house-container';
                        buttonContainer.appendChild(houseContainer);
                    }


                    
                    let exit = document.createElement('button');
                    exit.className = 'exit';
                    exit.id = 'exit-message-box';
                    this.messageBox.appendChild(exit);
                    exit.appendChild(document.createTextNode('X'));
                    exit.onclick = () => {
                        this.messageBox.style.visibility = 'hidden';
                    }
                    
                    let descrizione = document.createElement('div');
                    descrizione.id = 'descrizione-message-box';
                    descrizione.appendChild(document.createTextNode(''));
                    this.descrizioneMessageBox = descrizione;
                    messageSubContainer.appendChild(descrizione);
                    
                    let titolo = document.createElement('div');
                    titolo.id = 'titolo-message-box';
                    titolo.appendChild(document.createTextNode(''));
                    this.titoloMessageBox = titolo;
                    messageSubContainer.appendChild(titolo);
                    
                    // si chiude quando premi esc
                    document.addEventListener('keydown', (e)=>{
                        if (e.code == 'Escape'){
                            this.messageBox.style.visibility = 'hidden';
                        }
                    });
    
                    td.appendChild(div);
                    continue;
                } else if (i >= 2 && i <= boardDIM - 3 && j >= 2 && j <= boardDIM - 3){
                    continue;
                }
                td = document.createElement('td');
                td.id = 'casella-' + i + '-' + j;
                td.className = 'casella';
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        this.board.appendChild(tbody);
    
        
    
        // adesso invece sistemiamo gli id del tabellone
        let barra;
        let div = document.getElementById('casella-0-0');
        // debug
        //div.appendChild(document.createTextNode('0'));
        div.id = 'casella-0';
        this.caselle[0] = div;
    
        div = document.getElementById('casella-0-11');
        //div.appendChild(document.createTextNode('10'));
        div.id = 'casella-10';
        let prigione = document.createElement('div');
        prigione.id = 'prigione';
        div.appendChild(prigione);
        this.prigione = prigione;
        this.caselle[10] = div;

    
        div = document.getElementById('casella-11-0');
        //div.appendChild(document.createTextNode('30'));
        div.id = 'casella-30';
        this.caselle[30] = div;
    
        div = document.getElementById('casella-11-11');
        //div.appendChild(document.createTextNode('20'));
        div.id = 'casella-20';
        this.caselle[20] = div;
    
        let ii = 0;
        let jj = 2;
        id = 1;
        for (let i = 0; i < 9; i++){
            // sistemo indice di barra e casella
            div = document.getElementById('casella-' + ii + '-' + (jj + i));
            barra = document.getElementById('casella-' + (ii + 1) + '-' + (jj + i))
            div.id = 'casella-' + id;
            barra.id = 'barra-' + id;
            barra.className = 'barra';
            this.caselle[id] = div;
            this.barre[id] = barra;
            
            id++;
        }
    
        
        ii = 2;
        jj = boardDIM - 1;
        id = 11;
        for (let i = 0; i < 9; i++){
            // debug
            //console.log('casella-' + ii + '-' + (jj + i) + ' / ' + id);
    
    
    
            // sistemo indice di barra e casella
            div = document.getElementById('casella-' + (ii + i) + '-' + (jj));
            barra = document.getElementById('casella-' + (ii + i) + '-' + (jj - 1))
            div.id = 'casella-' + id;
            barra.id = 'barra-' + id;
            barra.className = 'barra';
            this.caselle[id] = div;
            this.barre[id] = barra;
    
            //debug
            //div.appendChild(document.createTextNode(id));
            id++;
        }
    
        ii = boardDIM - 1;
        jj = boardDIM - 3;
        id = 21;
        for (let i = 0; i < 9; i++){
            // debug
            //console.log('casella-' + ii + '-' + (jj + i) + ' / ' + id);
    
    
            // sistemo indice di barra e casella
            div = document.getElementById('casella-' + (ii) + '-' + (jj - i));
            barra = document.getElementById('casella-' + (ii - 1) + '-' + (jj - i))
            div.id = 'casella-' + id;
            barra.id = 'barra-' + id;
            barra.className = 'barra';
            this.caselle[id] = div;
            this.barre[id] = barra;
    
            //debug
            //div.appendChild(document.createTextNode(id));
    
            id++;
        }
    
        ii = boardDIM - 3;
        jj = 0;
        id = 31;
        for (let i = 0; i < 9; i++){
    
            // sistemo indice di barra e casella
            div = document.getElementById('casella-' + (ii - i) + '-' + (jj));
            barra = document.getElementById('casella-' + (ii - i) + '-' + (jj + 1))
            div.id = 'casella-' + id;
            barra.id = 'barra-' + id;
            barra.className = 'barra';
            this.caselle[id] = div;
            this.barre[id] = barra;
            
            id++;
        }
    
    
    
        // spazio per imprevisti e probabilita
        div = document.getElementById('centro');
        let probabilita = document.createElement('div');
        probabilita.appendChild(document.createTextNode('?'));
        let imprevisti = document.createElement('div');
        imprevisti.appendChild(document.createTextNode('!'));
        probabilita.id = 'probabilita';
        imprevisti.id = 'imprevisti';
        div.appendChild(imprevisti);
        div.appendChild(probabilita);
        this.imprevisti = imprevisti;
        this.probabilita = probabilita;
    
        // inserisco le immagini nei 4 angoli
        inserisciImmagineAngolo(0,'/media/via.svg',-45);
        inserisciImmagineAngolo(10,'/media/prigione.svg',180);
        inserisciImmagineAngolo(20,'/media/parcheggio_libero.svg',-45);
        inserisciImmagineAngolo(30,'/media/vai_in_prigione.svg',45);
    }
}

let board;
let boardDIM = 13;                  // dimensione complessiva del tabellone
let elementi = boardDIM - 4;        // caselle interne al tabellone

// funzione per stampare ed inizializzare gli id del tavolo da gioco
function printBoard(){

    // identificarore univoco della tabella
    let id = 0;

    let tbody = document.createElement('tbody');

    for (let i = 0; i < boardDIM; i++){
        let tr = document.createElement('tr');
        tr.id = 'riga-' + i;
        tr.className = 'riga';
        for (let j = 0; j < boardDIM; j++){
            let td;
            // ci sono dei casi particolari
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
                td = document.createElement('td');
                td.colSpan = 9;
                td.rowSpan = 9;
                td.id = 'centro';
                td.className = 'casella';
                tr.appendChild(td);
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
    board.appendChild(tbody);

    

    // adesso invece sistemiamo gli id del tabellone
    let barra;
    let div = document.getElementById('casella-0-0');
    // debug
    //div.appendChild(document.createTextNode('0'));
    div.id = 'casella-0';

    div = document.getElementById('casella-0-11');
    //div.appendChild(document.createTextNode('10'));
    div.id = 'casella-10';

    div = document.getElementById('casella-11-0');
    //div.appendChild(document.createTextNode('30'));
    div.id = 'casella-30';

    div = document.getElementById('casella-11-11');
    //div.appendChild(document.createTextNode('20'));
    div.id = 'casella-20';

    let ii = 0;
    let jj = 2;
    id = 1;
    for (let i = 0; i < elementi; i++){
        // debug
        //console.log('casella-' + ii + '-' + (jj + i) + ' / ' + id);


        // sistemo indice di barra e casella
        div = document.getElementById('casella-' + ii + '-' + (jj + i));
        barra = document.getElementById('casella-' + (ii + 1) + '-' + (jj + i))
        div.id = 'casella-' + id;
        barra.id = 'barra-' + id;
        barra.className = 'barra';

        //debug
        //div.appendChild(document.createTextNode(id));
        
        id++;
    }

    
    ii = 2;
    jj = boardDIM - 1;
    id = 11;
    for (let i = 0; i < elementi; i++){
        // debug
        //console.log('casella-' + ii + '-' + (jj + i) + ' / ' + id);



        // sistemo indice di barra e casella
        div = document.getElementById('casella-' + (ii + i) + '-' + (jj));
        barra = document.getElementById('casella-' + (ii + i) + '-' + (jj - 1))
        div.id = 'casella-' + id;
        barra.id = 'barra-' + id;
        barra.className = 'barra';

        //debug
        //div.appendChild(document.createTextNode(id));
        id++;
    }

    ii = boardDIM - 1;
    jj = boardDIM - 3;
    id = 21;
    for (let i = 0; i < elementi; i++){
        // debug
        //console.log('casella-' + ii + '-' + (jj + i) + ' / ' + id);


        // sistemo indice di barra e casella
        div = document.getElementById('casella-' + (ii) + '-' + (jj - i));
        barra = document.getElementById('casella-' + (ii - 1) + '-' + (jj - i))
        div.id = 'casella-' + id;
        barra.id = 'barra-' + id;
        barra.className = 'barra';

        //debug
        //div.appendChild(document.createTextNode(id));

        id++;
    }

    ii = boardDIM - 3;
    jj = 0;
    id = 31;
    for (let i = 0; i < elementi; i++){
        // debug
        //console.log('casella-' + ii + '-' + (jj + i) + ' / ' + id);

        // sistemo indice di barra e casella
        div = document.getElementById('casella-' + (ii - i) + '-' + (jj));
        barra = document.getElementById('casella-' + (ii - i) + '-' + (jj + 1))
        div.id = 'casella-' + id;
        barra.id = 'barra-' + id;
        barra.className = 'barra';

        //debug
        //div.appendChild(document.createTextNode(id));
        
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

    // inserisco le immagini nei 4 angoli
    inserisciImmagineAngolo(0,'/media/via.svg',-45);
    inserisciImmagineAngolo(10,'/media/prigione.svg',180);
    inserisciImmagineAngolo(20,'/media/parcheggio_libero.svg',-45);
    inserisciImmagineAngolo(30,'/media/vai_in_prigione.svg',45);

}


document.addEventListener('DOMContentLoaded',() => {
    board = document.getElementById('board');
    printBoard();
});


// funzione per inserire le immagini negli angoli
function inserisciImmagineAngolo(casella,immagine,angolo = 0){
    let div = document.getElementById('casella-' + casella);
    let img = document.createElement('img');
    img.src = immagine;
    img.style.transform = 'rotate(' + angolo + 'deg)';
    if (casella == 10){
        img.style.transform += ' translate(5px,-8px)';
    }
    div.appendChild(img);
}

function rimuoviImmagine(casella){
    let div = document.getElementById('casella-' + casella);
    while (div.firstChild){
        div.removeChild(div.firstChild);
    }
}


let probabilita;
let imprevisto;
document.addEventListener('DOMContentLoaded', () => {
    
    // inizializzo il layout
    initLayout();

    // stampo la board
    printBoard();


    // stampo i dadi
    printDadi();

    // PROVA CASELLE
    let casellaProva = new Casella('Ingegneria Polo ','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50]);
    let casellaTesto = new Casella('testo di prova','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50]);
    let casellaPocoTesto = new Casella('pr','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50]);
    let casellaTantoTesto = new Casella('Una casella dalla descrizione decisamente lunga','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50]);


    // prova
    for (let i = 0; i < 40; i++){
        casellaProva.nome = "Ingegneria Polo " + i;
        casellaProva.colore = decimalToRgb(((i + 1) * 4091));
        //console.log(decimalToRgb(i*2000));
        casellaProva.stampaProprieta();
        casellaProva.inserisiProprieta(i);
    }

    // PROVA INSERIMENTO IMPREVISIT E PROBABILITA NEL TABELLONE
    //probabilita = new Casella('probabilita');
    //imprevisto = new Casella('imprevisti');
    //imprevisto.inserisiProprieta(34).inserisiProprieta(24).inserisiProprieta(32).inserisiProprieta(22);
    //probabilita.inserisiProprieta(31).inserisiProprieta(33).inserisiProprieta(35).inserisiProprieta(26);
    
    
    // caselle con testo di prova
    //casellaProva.inserisiProprieta(3).inserisiProprieta(13).inserisiProprieta(23).inserisiProprieta(33);
    //casellaTesto.inserisiProprieta(4).inserisiProprieta(14).inserisiProprieta(24).inserisiProprieta(34);

    // casella con poco testo
    //casellaPocoTesto.inserisiProprieta(5).inserisiProprieta(15).inserisiProprieta(25).inserisiProprieta(35);

    // casella con tanto testo
    //casellaTantoTesto.inserisiProprieta(6).inserisiProprieta(16).inserisiProprieta(26).inserisiProprieta(36);
    // tanto testo, per le scelte progettuali fatte, fara' sempre overflow
})
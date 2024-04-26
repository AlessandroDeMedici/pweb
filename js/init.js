
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
    let casellaImmagine = new Casella('Stazione Pisa San Rossore','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50],'/media/treno.svg');
    let societaAcquaPotabile = new Casella('Societa acqua potabile','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50],'/media/rubinetto.svg');
    let societaElettrica = new Casella('Societa elettrica','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50],'/media/lampadina.svg');
    let probabilita = new Casella('probabilita');
    let imprevisto = new Casella('imprevisti');
    let tassaLusso = new Casella('Tassa di lusso','descrizione di prova',1,100,[200,150,200],[50,100,200,300,400,600],[50],'/media/anello.svg');
    let tassaPatrimoniale = new Casella('Tassa patrimoniale','descrizione di prova',1,100,[200,150,200],[50,100,200,300,400,600],[50],'/media/patrimoniale.svg');

    // prova
    for (let i = 0; i < 40; i++){
        casellaProva.nome = "Ingegneria Polo " + i;
        let a = (i + 150) * 255;
        casellaProva.colore = '#' + '0' + a.toString(16) + '0';
        //console.log(decimalToRgb(i*2000));
        casellaProva.stampaProprieta();
        if (!(i%5)){
            casellaImmagine.inserisiProprieta(i);
        }  else if (i == 2 || i == 17 || i == 33) {
            probabilita.inserisiProprieta(i);
        } else if (i == 7 || i == 22 || i == 36) {
            imprevisto.inserisiProprieta(i);
        } else if (i == 12) {
            societaElettrica.inserisiProprieta(i);
        } else if (i == 27) {
            societaAcquaPotabile.inserisiProprieta(i);
        } else if (i == 38) {
            tassaLusso.inserisiProprieta(i);
        } else if (i == 4) {
            tassaPatrimoniale.inserisiProprieta(i);
        } else
            casellaProva.inserisiProprieta(i);
    }


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
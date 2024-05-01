
let probabilita;
let imprevisto;


document.addEventListener('DOMContentLoaded', () => {

    // inizializzo la home
    printHome();

    // inizializzo il layout di gioco
    initLayout();

    // stampo la board
    printBoard();

    // stampo i dadi
    printDadi();

    // nascondo il gioco
    gameContainer.style.display = 'none';

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
        casellaProva.descrizione = 'descrizione di prova numero ' + i;
        let a = (i + 150) * 255;
        casellaProva.colore = '#' + '0' + a.toString(16) + '0';
        //console.log(decimalToRgb(i*2000));
        casellaProva.stampaProprieta();
        if (!(i%5)){
            casellaImmagine.inserisciProprieta(i);
        }  else if (i == 2 || i == 17 || i == 33) {
            probabilita.inserisciProprieta(i);
        } else if (i == 7 || i == 22 || i == 36) {
            imprevisto.inserisciProprieta(i);
        } else if (i == 12) {
            societaElettrica.inserisciProprieta(i);
        } else if (i == 27) {
            societaAcquaPotabile.inserisciProprieta(i);
        } else if (i == 38) {
            tassaLusso.inserisciProprieta(i);
        } else if (i == 4) {
            tassaPatrimoniale.inserisciProprieta(i);
        } else
            casellaProva.inserisciProprieta(i);
    }


    //imprevisto.inserisciProprieta(34).inserisciProprieta(24).inserisciProprieta(32).inserisciProprieta(22);
    //probabilita.inserisciProprieta(31).inserisciProprieta(33).inserisciProprieta(35).inserisciProprieta(26);
    
    
    // caselle con testo di prova
    //casellaProva.inserisciProprieta(3).inserisciProprieta(13).inserisciProprieta(23).inserisciProprieta(33);
    //casellaTesto.inserisciProprieta(4).inserisciProprieta(14).inserisciProprieta(24).inserisciProprieta(34);

    // casella con poco testo
    //casellaPocoTesto.inserisciProprieta(5).inserisciProprieta(15).inserisciProprieta(25).inserisciProprieta(35);

    // casella con tanto testo
    //casellaTantoTesto.inserisciProprieta(6).inserisciProprieta(16).inserisciProprieta(26).inserisciProprieta(36);
    // tanto testo, per le scelte progettuali fatte, fara' sempre overflow


    // prova di inserimento primo giocatore
    let player1 = new Giocatore();
    let player2 = new Giocatore();
    let player3 = new Giocatore();
    let player4 = new Giocatore();
    let player5 = new Giocatore();

    // test di movimento della pedina
    setTimeout(() => {
         player1.muoviGiocatore((player1.posizione + 1)%40);
         player2.muoviGiocatore((player2.posizione + 1)%40);
         player3.muoviGiocatore((player3.posizione + 1)%40);
         player4.muoviGiocatore((player4.posizione + 1)%40);
         player5.muoviGiocatore((player5.posizione + 1)%40);
     },1000);
})
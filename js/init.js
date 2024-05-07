

document.addEventListener('DOMContentLoaded', () => {

    // inizializzo la home
    printHome();

    gameContainer = document.getElementById('game-container');

    // inizializzo il layout di gioco
    initLayout();

    // stampo la board
    printBoard();

    // stampo i dadi
    printDadi();

    // nascondo il gioco
    gameContainer.style.display = 'none';

    // PROVA CASELLE
    // let casellaTesto = new Casella('testo di prova','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50]);
    // let casellaPocoTesto = new Casella('pr','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50]);
    // let casellaTantoTesto = new Casella('Una casella dalla descrizione decisamente lunga','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50]);
    // let casellaImmagine = new Casella('Stazione Pisa San Rossore','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50],'/media/treno.svg');
    // let societaAcquaPotabile = new Casella('Societa acqua potabile','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50],'/media/rubinetto.svg');
    // let societaElettrica = new Casella('Societa elettrica','descrizione di prova',1,100,[100,150,200],[50,100,200,300,400,600],[50],'/media/lampadina.svg');
    // let probabilita = new Casella('probabilita');
    // let imprevisto = new Casella('imprevisti');
    // let tassaLusso = new Casella('Tassa di lusso','descrizione di prova',1,100,[200,150,200],[50,100,200,300,400,600],[50],'/media/anello.svg');
    // let tassaPatrimoniale = new Casella('Tassa patrimoniale','descrizione di prova',1,100,[200,150,200],[50,100,200,300,400,600],[50],'/media/patrimoniale.svg');


    // array delle caselle
    let scenario = [];
    scenario.push(new Casella('Via!','Ogni volta che passi dal via ritirerai $200'));
    scenario.push(new Casella('Via Cimabue',null,1,'brown',[60,50,50],[2,10,30,90,160,250],30));
    scenario.push(new Casella('probabilita'));
    scenario.push(new Casella('Polo F',null,1,'brown',[60,50,50],[4,20,60,180,320,450],30));
    scenario.push(new Casella('Tassa patrimoniale',null,null,null,null,[200],[100],'/media/patrimoniale.svg'));
    scenario.push(new Casella('Stazione Livorno Centrale',null,9,null,[200],[25,50,100,200],100,'/media/treno.svg'));
    
    scenario.push(new Casella('Via Giunta Pisano',null,2,'lightblue',[100,50,50],[6,30,90,270,400,550],50));
    scenario.push(new Casella('imprevisti'));
    scenario.push(new Casella('Via Bonanno Pisano',null,2,'lightblue',[100,50,50],[6,30,90,270,400,550],50));
    scenario.push(new Casella('Polo B',null,2,'lightblue',[120,50,50],[8,40,100,300,450,600],60));
    
    scenario.push(new Casella('prigione'));
    scenario.push(new Casella('Borgo Stretto',null,3,'pink',[140,100,100],[10,50,150,450,625,750],70));
    scenario.push(new Casella('Mensa Cammeo',null,10,null,[150],[4,10],75,'/media/lampadina.svg'));
    scenario.push(new Casella('Piazza Santa Caterina',null,3,'pink',[140,100,100],[10,50,150,450,625,750],70));
    scenario.push(new Casella("Sant'Anna",null,3,'pink',[160,100,100],[12,60,180,500,700,900],80));
    
    scenario.push(new Casella('Stazione Pisa San Rossore',null,9,null,[200],[25,50,100,200],100,'/media/treno.svg'));
    scenario.push(new Casella('Piazza dei Cavalieri',null,4,'orange',[180,100,100],[14,70,200,550,750,950],90));
    scenario.push(new Casella('probabilita'));
    scenario.push(new Casella('Scuola Normale',null,4,'orange',[180,100,100],[14,70,200,550,750,950],90));
    scenario.push(new Casella('Piazza Dante',null,4,'orange',[200,100,100],[16,80,220,600,800,1000],100));

    scenario.push(new Casella('parcheggio gratuito'));
    scenario.push(new Casella('Via Contessa Matilde',null,5,'red',[220,150,150],[18,90,250,700,875,1050],110));
    scenario.push(new Casella('imprevisti'));
    scenario.push(new Casella('Via Marinello Nelli',null,5,'red',[220,150,150],[18,90,250,700,875,1050],110));
    scenario.push(new Casella('Polo PN',null,5,'red',[240,150,150],[20,100,300,750,925,1100],120));

    scenario.push(new Casella('Stazione Pisa Centrale',null,9,null,[200],[25,50,100,200],100,'/media/treno.svg'));
    scenario.push(new Casella('Via Santa Maria',null,6,'yellow',[260,150,150],[22,110,330,800,975,1150],130));
    scenario.push(new Casella('Lungarni',null,6,'yellow',[260,150,150],[22,110,330,800,975,1150],130));
    scenario.push(new Casella('CNUCE',null,6,'yellow',[280,150,150],[24,120,360,850,1025,1200],140));
    scenario.push(new Casella('Mensa Martiri',null,10,null,[150],[4,10],75,'/media/lampadina.svg'));
    
    scenario.push(new Casella('In prigione!'));
    scenario.push(new Casella('Via Diotisalvi',null,7,'green',[300,200,200],[26,130,390,900,1100,1275],150));
    scenario.push(new Casella('Polo C',null,7,'green',[300,200,200],[26,130,390,900,1100,1275],150));
    scenario.push(new Casella('probabilita'));
    scenario.push(new Casella('Polo A',null,7,'green',[320,200,200],[28,150,450,1000,1200,1400],160));

    scenario.push(new Casella('Stazione di Pontedera',null,9,null,[200],[25,50,100,200],100,'/media/treno.svg'));
    scenario.push(new Casella('imprevisti'));
    scenario.push(new Casella('Piazza dei Miracoli',null,8,'blue',[350,200,200],[35,175,500,1100,1300,1500],175));
    scenario.push(new Casella('Tassa di lusso',null,null,null,null,[100],[100],'/media/anello.svg'));
    scenario.push(new Casella('Torre di Pisa',null,8,'blue',[400,200,200],[50,100,200,600,1400,1700,2000],200));

    for (let i in scenario){
        scenario[i].inserisciProprieta(i);
        scenario[i].stampaProprieta();
    }


    // // prova
    // for (let i = 0; i < 40; i++){
    //     casellaProva.nome = "Ingegneria Polo " + i;
    //     casellaProva.descrizione = 'descrizione di prova numero ' + i;
    //     let a = (i + 150) * 255;
    //     casellaProva.colore = '#' + '0' + a.toString(16) + '0';
    //     //console.log(decimalToRgb(i*2000));
    //     casellaProva.stampaProprieta();
    //     if (!(i%5)){
    //         casellaImmagine.inserisciProprieta(i);
    //     }  else if (i == 2 || i == 17 || i == 33) {
    //         probabilita.inserisciProprieta(i);
    //     } else if (i == 7 || i == 22 || i == 36) {
    //         imprevisto.inserisciProprieta(i);
    //     } else if (i == 12) {
    //         societaElettrica.inserisciProprieta(i);
    //     } else if (i == 27) {
    //         societaAcquaPotabile.inserisciProprieta(i);
    //     } else if (i == 38) {
    //         tassaLusso.inserisciProprieta(i);
    //     } else if (i == 4) {
    //         tassaPatrimoniale.inserisciProprieta(i);
    //     } else
    //         casellaProva.inserisciProprieta(i);
    // }
})
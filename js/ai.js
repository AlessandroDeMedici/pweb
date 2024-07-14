// codice per gli npc


// quando un npc puo' acquista sempre


// le offerte vengono fatte in modo da riempire i colori che si possiedono


// quando non si hanno soldi per pagare si vende per ordine decrescente di importanza


// le ai hanno una lista di averi, ordinati per importanza

// cercano di ottenere il bene che massimizza l'importanza

// vendono per importanza decrescente

// velocita di "ragionamento"
let speed = 1;


// deve esistere una funzione di sell

// se questa funzione ha ritorno negativo allora siamo in bancarotta

// quando un giocatore va in bancarotta tutto va alla banca


class IA{
    constructor(){

    }

    sell(){
        return 1;
    }


    buy(){
        return 0;
    }
};
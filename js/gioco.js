let player = 0;

class Giocatore{
    constructor(){
        // sistemo la pedina
        this.pedina = document.createElement('img');
        this.pedina.className = 'giocatore';
        this.pedina.src = '/media/pedina.svg';

        // do un id al giocatore
        this.playerID = 'giocatore-' + player++;

        // inseririsco il giocatore nella prima casella
        let casella = document.getElementById('contenitore-giocatori-0');
        casella.appendChild(this.pedina);

        // tengo traccia della posizione
        this.posizione = 0;
    }

    // sposto il giocatore nella casella i-esima
    muoviGiocatore(i){
        if (i >= 40 || i < 0){
            console.log('movimento errato');
            return;
        }

        let div = document.getElementById('contenitore-giocatori-' + this.posizione);
        div.removeChild(this.pedina);

        let newdiv = document.getElementById('contenitore-giocatori-' + i);
        newdiv.appendChild(this.pedina);

        this.posizione = i;
    }


}

// velocita di "ragionamento"
const speed = 1;


// piu' alto e' il rischio piu' l'atteggiamento del giocatore sara' aggressivo e rischioso
const rischio = 3;

// piu' alta e' la generosity maggiormente generose saranno le offerte dei giocatori (minimo di 1)
const generosity = 1.2;

// quando un giocatore va in bancarotta tutto va alla banca


class IA{
    constructor(giocatore){
        this.player = giocatore;
    }
    
    // per ogni casella posseduta dal giocatore e' possibile calcolare un'importanza
    // l'importanza si ottiene dalla formula
    // prezzo di acquisto * quante_stessa_serie * (num_case + 1 / albergo)
    importanza(casella){
        // calcolo quante caselle ho della stessa serie
        let stessa_serie = 0;
        for (let p of this.player.proprieta){
            if (casella.gruppo == p.gruppo)
                stessa_serie++
        }
        let num_case = ( casella.albergo ) ? 5 : casella.case + 1;
        casella.importanza = casella.prezzo[0] * stessa_serie * num_case;
    }


    // aggiorna l'importanza di tutte le proprieta
    updateImportanza(){
        for (let p of this.player.proprieta){
            this.importanza(p);
        }
    }


    // ordina le proprieta per importanza
    sortImportanza(){
        this.player.proprieta.sort((a,b) => {
            return a.importanza - b.importanza;
        });
    }

    // ordina le proprieta per importanza decrescente
    sortImportanzaInversa(){
        this.player.proprieta.sort((a,b) => {
            return b.importanza - a.importanza;
        });
    }


    // devo vendere abbastanza proprieta o case fino a rifare i soldi
    // quando vendo una casella ricalcolo l'importanza di tutte le caselle
    sell(soldi){

        if (this.player.proprieta.length == 0){
            // allora vado in bancarotta
            this.player.dichiaraBancarotta();
            return -1;
        }
        
        // calcolo l'importanza delle proprieta
        this.updateImportanza();
        
        // le ordino per importanza
        this.sortImportanza();

        console.log(this.player.proprieta);
        // vendo o solo le case o le proprieta meno importanti

        for (let p of this.player.proprieta){

            if (p.immagine){
                // se si tratta di un treno o una societa non ci possono essere case
                // allora vendo la proprieta
                p.free();
                this.player.ricevi(p.prezzo[0]);
                console.log(this.player.username + ' ha venduto ' + p.nome + " per " + p.prezzo[0]);
            } else {
                // altrimenti parto dall'albergo
                if (p.albergo){
                    p.albergo--;
                    p.case =  4;
                    this.player.ricevi(p.prezzo[2]);
                    console.log(this.player.username + ' ha venduto un albergo su ' + p.nome + " per " + p.prezzo[2]);

                    // posso uscire
                    if (this.player.saldo >= soldi)
                        break;
            
                }
                // poi continuo con le case
                while (p.case >= 1){
                    p.case--;
                    this.player.ricevi(p.prezzo[1]);
                    console.log(this.player.username + ' ha venduto una casa su ' + p.nome + ' per ' + p.prezzo[1]);

                    // controllo di poter uscire
                    if (this.player.saldo >=  soldi)
                        break;
                }

                // controllo di poter uscire
                if (this.player.saldo >= soldi){
                    break;
                }

                // infine con la proprieta
                let indice = this.player.proprieta.indexOf(p);
                this.player.proprieta.splice(indice,1);
                
                // libero la proprieta
                p.free();

                // ricevo i soldi della proprieta
                this.player.ricevi(p.prezzo[0]);

                // controllo di poter uscire
                if (this.player.saldo >= soldi){
                    break;
                }
            }
        }

        // se neanche in questo modo sono riuscito ad accumulare soldi allora dichiaro bancarotta
        if (this.player.saldo < soldi){
            this.player.dichiaraBancarotta();
            return -1;
        }


        // altrimenti ritorno 1
        this.player.updateSaldo();

        return 1;
    }


    buy(casella){

        // se ho i soldi acquisto sempre la casella
        if (casella.owner == null){
            if (this.player.saldo >= casella.prezzo[0]){
                this.player.proprieta.push(casella);
                casella.owner = this.player.numId;
                this.player.paga(casella.prezzo[0]);
                this.player.updateSaldo();

                console.log(this.player.username + ' ha acquistato ' + casella.nome);
            }
            // altrimenti non la acquistare
        }
        return 0;
    }

    // controllo di poter comprare case
    compraCasa(){

        // ordino le proprieta per importanza decrscente
        this.updateImportanza();
        this.sortImportanzaInversa();

        // a questo punto compro un massimo di richio case
        let i = 0;

        for (let p of this.player.proprieta){

            // controllo che per questa proprieta si possano comprare case
            if (p.immagine)
                continue;

            if (p.albergo){
                // ha gia' un albergo
                // non posso fare niente
            } else if (p.case){
                // acquisto un'altra casa se posso
                if (p.case == 4){
                    // devo acquistare un albergo
                    if (this.player.saldo >= p.prezzo[2]){
                        p.case = 0;
                        p.albergo = 1;
                        p.paga(p.prezzo[2]);
                        console.log(this.player.username + ' ha acquistato un albergo su ' + p.nome);
                        

                        i++;
                    }
                } else {
                    // devo acquistare una casa
                    if (this.player.saldo >= p.prezzo[1]){
                        p.case++;
                        p.paga(p.prezzo[1]);
                        console.log(this.player.username + ' ha acquistato una casa su ' + p.nome);


                        i++;
                    }
                }
            } else if (p.case == 0){
                // acquisto la prima casa se posso
                
                // controllo di possedere tutte le case di questo gruppo
                if (p.haveAll(this.player)){
                    // allora posso acquistare una casa
                    p.case++;
                    p.paga(p.prezzo[1]);
                    console.log(this.player.username + ' ha acquistato una casa su ' + p.nome);

                    i++;
                } else {
                    // altrimenti non posso acquistare la casa
                    ;
                }

            } else {
                //
                ;
            }

            // ho acquistato un massimo di rischio case per questo turno
            if (i == rischio)
                break;
        }

        // aggiorno il saldo a video
        this.player.updateSaldo();
    }

    // facciamo un'offerta ad un giocatore
    // semplice invio di un'offerta per una proprieta' che ci interessa
    faiOfferta(turno){

        // le probabilita di fare un'offerta durante il turno aumentano durante la partita

        // per avere una probabilita che aumenta esponenzialmente durante la partita sfrutto il logaritmo
        let p = 1 - (1 / (2 * Math.log(turno/10)));

        // circa sotto turno 17 non faccio offerte
        if (p < 0)
            return;

        if (Math.random() < p){

            // allora faccio un offerta prediligendo le proprieta' dei gruppi piu' importanti
            this.updateImportanza();

            for (let p of this.player.proprieta){
                // cerco una proprieta di quel gruppo che abbia un owner diverso da me
                 for (let pp of scenario){
                    if (pp.gruppo == p.gruppo && ((pp.owner != null) && pp.owner != p.owner)){


                        // sicuramente la proprieta non ha case perche' nessun giocatore ha la serie completa

                        // allora procedo a fare l'offerta
                        let id1 = this.player.numId;
                        let id2 = pp.owner;

                        let proprieta1 = [];
                        let proprieta2 = [pp];
                        let soldi2 = 0;
                        let soldi1 = 0;

                        if (this.player.saldo >= Math.floor(pp.prezzo[0] * generosity)){
                            // se ho i soldi offro solo i soldi
                            soldi1 = Math.floor(pp.prezzo[0] * generosity);
                        } else {
                            // altrimenti non faccio l'offerta per ora
                            return;
                        }

                        // invio l'offerta
                        inviaOfferta(id1,id2,proprieta1,proprieta2,soldi1,soldi2);

                        // aggiungo l'offerta all'array delle offerte se il giocatore destinatario e' diverso da 0
                        if (id2){
                            let offerta = offerte[offerte.length - 1];
                            giocatori[id2].offerte.push(offerta);
                        }

                        return;
                    }
                 }
            }
        }
    }

    // accetto un'offerta tra le offerte che possiedo
    accettaOfferta(){

        let offerta = this.player.offerte.shift();

        if (offerta){
            // devo valutare la bonta' dell'offerta

            // rifiuto tutte le offerte che mi danno un valore ricevuto minore del valore che do
            let valoreRicevuto = 0;
            let valoreInviato = 0;

            valoreRicevuto += offerta.soldi1;
            valoreInviato += offerta.soldi2;

            for (let p of offerta.proprieta1){
                valoreRicevuto += p.prezzo[0];
            }

            for (let p of offerta.proprieta2){
                valoreInviato += p.prezzo[0];
            }

            if (valoreRicevuto < valoreInviato){
                offerta.rifiutaOffer();
            }

            // assengo un valore da 0 a 0.5 alla bonta' del valore dell'offerta
            let p1 = (valoreRicevuto / (valoreRicevuto + valoreInviato)) * 0.5;

            // assegno un valore da 0 a 0.5 a quanto questa offerta e' vantaggiosa per me e svantaggiosa per l'altro
            let p2 = 0;

            let finish = 0;
            // se sto ricevendo caselle di gruppi che gia' possiedo allora aggiungi 0.25
            for (let p of this.player.proprieta){
                for (let pp of offerta.proprieta1){
                    if (pp.gruppo == p.gruppo){
                        p2 += 0.25;
                        finish = 1;
                    }
                    if (finish)
                        break;
                }
                if (finish)
                    break;
            }

            finish = 0;
            // se sto inviando caselle di gruppi che l'altro giocatore non possiede allora aggiungi 0.25
            for (let p of giocatori[offerta.id1].proprieta){
                for (let pp of offerta.proprieta2){
                    if (pp.gruppo == p.gruppo){
                        finish = 1;
                    }
                    if (finish)
                        break;
                }
                if (finish)
                    break;
            }

            if (!finish){
                p2 += 0.25;
            }

            // adesso accetto l'offerta con probabilita' p
            if (Math.random() < (p1 + p2)){
                offerta.acceptOffer();
                console.log(giocatori[offerta.id2].username + " ha accettato l'offerta di " + giocatori[offerta.id1].username);
                if (!offerta.id1){
                    alert(giocatori[offerta.id2].username + ' Ha accettato la tua offerta!');
                }
                return;
            } else {
                offerta.rifiutaOffer();
                console.log(giocatori[offerta.id2].username + " ha rifiutato l'offerta di " + giocatori[offerta.id1].username);
                if (!offerta.id1){
                    alert(giocatori[offerta.id2].username + ' Ha rifiutato la tua offerta!');
                }
                return;
            }
        }
    }
};
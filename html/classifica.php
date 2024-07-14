
<style>

    #contenitore-classifica{
        z-index: 2;

        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;

        background-color: white;
        box-shadow: 0 0 25px rgba(17, 1,68, 0.5);

        width: 50%;
        height: 50%;
        border: 3px solid lightgray;
        border-radius: 10px;

        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    #exit-classifica{
        position: absolute;
        top: 10px;
        right: 10px;
        margin: 10px;
    }

    #contenitore-classifica h2{
        text-align: center;
        font-size: 50px;
    }

    #classifica{
        margin: 20px;
        height: 200px;

        border-collapse: collapse;
    }

    #classifica td {
        width: 200px;
        height: 50px;
        text-align: center;
    }

    .box-classifica{
        overflow: auto;

        height: 300px;
    }


</style>

<div id="contenitore-classifica" style="display: none">
    <h2>Classifica dei giocatori</h2>
    <button id="exit-classifica">X</button>
    <div class="box-classifica">
        <table id="classifica"></table>
    </div>
</div>

<script>

    const contenitoreClassifica = document.getElementById('contenitore-classifica');
    const nuovaPartita = document.getElementById('bottone-nuova-partita');
    const bottoneClassifica = document.getElementById('bottone-classifica');
    const exitClassifica = document.getElementById('exit-classifica');
    const classifica = document.getElementById('classifica');
    bottoneClassifica.onclick = richiediClassifica;
    nuovaPartita.onclick = avviso;
    exitClassifica.onclick = hideClassifica;


    // funzione chiamata per richiedere la classifica
    function richiediClassifica(e){
        e.preventDefault();

        let request = new XMLHttpRequest();
        request.open("post", "../php/classifica.php");
        request.onload = () => {
            const response = JSON.parse(request.response);

            // pulisci la classifica
            classifica.innerHTML = '<tr><td>Username</td><td>Punti</td></tr>';


            // carica la classifica
            for (let a of response){
                let tr = document.createElement('tr');
                tr.innerHTML = '<tr><td>' + a['username'] + "</td><td>" + a['points'] + "</td></tr>";

                classifica.appendChild(tr);
            }


            // mostra la classifica
            contenitoreClassifica.style.display = 'flex';



        };
        request.onerror = (event) => console.log(event);
        request.send();

    }


    // funzione chiamata per nascondere la classifica
    function hideClassifica(e){
        e.preventDefault();

        contenitoreClassifica.style.display = 'none';

    }

</script>
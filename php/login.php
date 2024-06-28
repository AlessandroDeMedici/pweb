<?php

    header('Content-Type: application/json');


    $input = file_get_contents('php://input');
    $input = json_decode($input,true);

    $notValidCharacter = ['&','=','_',"'",'-','+',',','<','>',';'];

    // validazione degli input
    try {
        if (strlen($input['username']) < 5){
            throw new Exception('Username non valido...');
        }
        if (strlen($input['password']) < 5){
            throw new Exception('Password non valida...');
        }
        foreach ($notValidCharacter as $c){
            if (strstr($input['username'],$c)){
                throw new Exception('Caratteri non validi...');
            }
        }
        foreach ($notValidCharacter as $c){
            if (strstr($input['passowrd'],$c)){
                throw new Exception('Caratteri non validi...');
            }
        }
    } catch (Exception $e){
        $risultato = [
            'logged'    => false,
            'message'     => $e->getMessage()
        ];
        echo json_encode($risultato);
        die();
    }


    // se la sessione era attiva e posso restituire immediatamente il login lo faccio
    // ovvero se utente loggato e richiede di loggarsi con stesso utente
    if (isset($_SESSION['logged']) && ($_SESSION['logged'] == true && isset($_SESSION['username']) && $_SESSION['username'] == $input['username'])){
        $risultato = [
            'logged'    => true,
            'user'    => $input['username'],
            'message'  => 'sessione ripristinata'
        ];
        echo json_encode($risultato);
        die();
    }

    // controllo se la sessione era attiva altrimenti la attivo
    if (session_status() == PHP_SESSION_NONE)
    session_start();

    // se l'utente era loggato e sta facendo nuovamente login ma con un altro account e' da considerarsi errore
    if (isset($_SESSION['logged']) && $_SESSION['logged'] == true && isset($_SESSION['username']) && $_SESSION['username'] != $input['username']){
        $risultato = [
            'logged'    => false,
            'user'      => $input['username'],
            'message'   => 'login senza logout'
        ];
        echo json_encode($risultato);
        die();
    }


    // a questo punto posso procedere a verificare il login
    $string = "mysql:host=127.0.0.1;dbname=Main";
    $user = "root";
    $pass = "";
    $pdo;
    $ritorno;
    $password;
    $username;

    try {
        // inizializzo il PDO
        $pdo = new PDO($string, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        
        $risultato = [
            'logged'    => false,
            'message'     => $e->getMessage()
        ];
        echo json_encode($risultato);
        die();

    }

    try {

        // eseguo la query
        $username = $input['username'];
        $password = $input['password'];

        // preparazione della query
        $query = "  SELECT * 
                    FROM Account
                    WHERE Username = :username 
                    LIMIT 1 ";

        $statement = $pdo->prepare($query);
        $statement->bindValue('username', $username);
        $statement->execute();

        $account = $statement->fetch();
        if (!strcmp(md5($password),$account['password'])){

            $_SESSION['logged'] = true;
            $_SESSION['username'] = $username;

            $risultato = [
                'logged'   => true,
                'user'      => $username,
                'message'   => 'login avvenuto con successo'
            ];

        } else {
            throw new Exception("Password non valida...");
        }
    } catch (PDOException | Exception $e){
        $risultato = [
            'logged'    => false,
            'message'    => $e->getMessage()
        ];
        echo json_encode($risultato);
        die();
    }

    // 
    $pdo = null;

    // ritorno la risposta
    echo json_encode($risultato);


?>
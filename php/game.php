<?php

    header('Content-Type: application/json');

    session_start();
    
    $notValidCharacter = ['&','=','_',"'",'-','+',',','<','>',';'];
    $username = $_POST['username'];
    $result;


    // validazione degli input
    try {

        // validazione degli input

        if (!$username){
            throw new Exception('Username non valido...');
        }
        
        if (strlen($username) < 5){
            throw new Exception('Username non valido...');
        }

        foreach ($notValidCharacter as $c){
            if (strstr($username,$c)){
                throw new Exception('Username non valido...');
            }
        }

    } catch (Exception $e){
        $risultato = [
            'game'    => false,
            'message' => $e->getMessage(),
            'id' => 0
        ];
        echo json_encode($risultato);
        die();
    }


    // a questo punto posso procedere a connettermi con il database
    $string = "mysql:host=127.0.0.1;dbname=dimatteo_641388";
    $user = "root";
    $pass = "";
    $pdo;

    try {
        // inizializzo il PDO
        $pdo = new PDO($string, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        
        $risultato = [
            'game'    => false,
            'message'     => $e->getMessage(),
            'id' => 0
        ];
        echo json_encode($risultato);
        die();

    }

    try  {

        // generazione di un codice di verifica
        $points = 0;

        // preparazione della query
        $query = "  INSERT
                    INTO game(username,points)
                    VALUES (:username,:points) ";

        $statement = $pdo->prepare($query);
        $statement->bindValue('username', $username);
        $statement->bindValue('points',$points);
        $statement->execute();

        // ottengo l'id
        $query = "  SELECT MAX(id) as id
                    FROM game";

        $statement = $pdo->prepare($query);
        $statement->execute();
        $id = $statement->fetch();
        $id = $id['id'];


        // ritorno
        $_SESSION['game'] = true;

        $result = [
            'game' => true,
            'message' => "Gioco registrato con successo",
            'id' => $id
        ];

    } catch (PDOException | Exception $e){
        $result = [
            'game' => false,
            'message' => $e->getMessage(),
            'id' => 0
        ];

        echo json_encode($result);
        die();
    }

    // chiudo il pdo
    $pdo = null;

    // ritorno la risposta
    echo json_encode($result);


?>
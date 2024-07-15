
<?php

    header('Content-Type: application/json');

    session_start();

    $punteggio = (int)$_POST['punteggio'];
    $id = (int)$_POST['id'];

    // validazione degli input
    try {
        if (!$punteggio || !$id){
            throw new Exception("Inseriti valori nulli...");
        }

        if (!is_numeric($punteggio) || !is_numeric($id)){
            throw new Exception("Inseriti valori non numerici...");
        }

    } catch (Exception $e) {
        $result = [
            'ok' => false,
            'message' => $e->getMessage()
        ];

        echo json_encode($result);
        die();
    }


    // a questo punto posso procedere a connettermi con il databse
    $string = "mysql:host=127.0.0.1;dbname=pweb";
    $user = "root";
    $pass = "";
    $pdo;

    try {
        // inizializzo il PDO
        $pdo = new PDO($string, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        
        $result = [
            'ok' => false,
            'message' => $e->getMessage()
        ];

        echo json_encode($result);
        
        die();

    }

    try  {

        // trovo l'entrata relativa a tale id
        $query = "  SELECT *
                    FROM game
                    WHERE id=:id";
        $statement = $pdo->prepare($query);
        $statement->bindValue('id',$id);
        $statement->execute();
        $row = $statement->fetch();

        if (!$row){
            throw new Exception("Game non presente");
        }

        // a questo punto procedo a modificare i punti
        $query = "  UPDATE game
                    SET points =:punti
                    WHERE id =:id";

        $statement = $pdo->prepare($query);
        $statement->bindValue('id',$id);
        $statement->bindValue('punti',$punteggio);
        $statement->execute();
        

        // a questo punto ritorniamo true
        $result = [
            'ok' => true,
            'message' => 'update punti avvenuto con successo'
        ];

    } catch (PDOException | Exception $e){
    
        $result = [
            'ok' => false,
            'message' => $e->getMessage()
        ];


        echo json_encode($result);
        die();

    }   

    // chiudo il pdo
    $pdo = null;

    // ritorno la risposta
    echo json_encode($result);


?>

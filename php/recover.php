
<?php

    header('Content-Type: application/json');

    session_start();

    $notValidCharacter = ['&','=','_',"'",'-','+',',','<','>',';'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
    $domanda = $_POST['domanda'];
    $risposta = $_POST['risposta'];


    try {
        // validazione degli input
        // 1. lunghezza username e password
        if (strlen($username) < 5){
            throw new Exception('Username non valido...');
        }
        if (strlen($password) < 5){
            throw new Exception('Password non valida...');
        }

        // 2. presenza di caratteri non validi
        foreach ($notValidCharacter as $c){
            if (strstr($username,$c)){
                throw new Exception('Caratteri non alidi...');
            }
        }
        foreach ($notValidCharacter as $c){
            if (strstr($password,$c)){
                throw new Exception('Caratteri non validi...');
            }
        }foreach ($notValidCharacter as $c){
            if (strstr($domanda,$c)){
                throw new Exception('Caratteri non validi...');
            }
        }foreach ($notValidCharacter as $c){
            if (strstr($risposta,$c)){
                throw new Exception('Caratteri non validi...');
            }
        }

        // 3. conferma password non valida
        if ($confirm != $password){
            throw new Exception('Le password non coincidono');
        }

        
    } catch (Exception $e){
        $risultato = [
            'message'     => $e->getMessage()
        ];
        echo json_encode($risultato);
        die();
    }




    // stabilisco la connessione
    $string = "mysql:host=127.0.0.1;dbname=pweb";
    $user = "root";
    $pass = "";
    $pdo;
    $result;

    try {
        // inizializzo il PDO
        $pdo = new PDO($string, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        
        $result = [
            'message'    => $e->getMessage()
        ];
        echo json_encode($risultato);
        die();

    }

    try {
        
        $query =    "SELECT * 
                    FROM Account
                    WHERE username=:username
                    LIMIT 1";

        $statement = $pdo->prepare($query);
        $statement->bindValue('username', $username);
        $statement->execute();

        $account = $statement->fetch();

        if (!$account){
            throw new Exception("account non trovato...");
        }

        // controllo che la domanda sia corretta
        if (strcmp($account['domanda'],$domanda) || strcmp($account['risposta'],$risposta)){
            $result = [
                'message' => 'Domanda o risposta non corretta'
            ];
            echo json_encode($result);
            die();
        }


        // account non trovato
        if (!$account){
            $result = [
                'message' => 'Account non trovato'
            ];
            echo json_encode($result);
            die();
        }

        // account trovato
        // procedo a modificare il record
        $query =    "UPDATE account
                    SET password = :pass
                    WHERE username = :username";
        $statement = $pdo->prepare($query);
        $statement->bindValue('pass',md5($password));
        $statement->bindValue('username',$username);
        $statement->execute();
        

        $result = [
            'message' => "Password modificata con successo!"
        ];


    } catch (PDOException | Exception $e) {
        $result = [
            'message'   => $e->getMessage()
        ];
    }

    echo json_encode($result);

    $pdo = null;

?>

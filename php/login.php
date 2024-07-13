<?php

    header('Content-Type: application/json');

    // controllo se la sessione era attiva altrimenti la attivo
    if (session_status() == PHP_SESSION_NONE){
        session_start();
        $_SESSION['logged'] = false;
        $_SESSION['username'] = '';
    }
    
    // validazione degli input
    try {
        
        $notValidCharacter = ['&','=','_',"'",'-','+',',','<','>',';'];

        $input['username'] = $_POST['username'];
        $input['password'] = $_POST['password'];


        // validazione degli input

        if (!$input['username'] || !$input['password']){
            throw new Exception('Inseriti valori nulli...');
        }
        
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
            if (strstr($input['password'],$c)){
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


    // a questo punto posso procedere a verificare il login
    $string = "mysql:host=127.0.0.1;dbname=pweb";
    $user = "root";
    $pass = "";
    $pdo;

    $username = $_POST['username'];
    $password = $_POST['password'];

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

    try  {

        // preparazione della query
        $query = "  SELECT * 
                    FROM Account
                    WHERE Username = :username
                    LIMIT 1";

        $statement = $pdo->prepare($query);
        $statement->bindValue('username', $username);
        $statement->execute();


        $account = $statement->fetch();

        // account non trovato
        if (!$account){
            $result = [
                'logged' => false,
                'user' => '',
                'message' => 'Username non trovato...'
            ];
            echo json_encode($result);
            die();
        }

        // password errata
        if (strcmp($account['password'],md5($password))){
            $result = [
                'logged' => false,
                'message' => 'Password errata...'
            ];
        } else {

            $_SESSION['logged'] = true;
            $_SESSION['username'] = $username;
            $result = [
                'logged' => true,
                'user' => $username,
                'message' => '',
                'sessione' => $_SESSION['logged']
            ];
        }



        $pdo = null;

        echo json_encode($result);
        die();


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
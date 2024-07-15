
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
                throw new Exception('Caratteri non validi...');
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
        $result = [
            'logged'    => false,
            'message'     => $e->getMessage()
        ];
        echo json_encode($result);
        die();
    }



    // stabilisco la connessione
    $string = "mysql:host=127.0.0.1;dbname=dimatteo_641388";
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
            'logged'    => false,
            'message'    => $e->getMessage()
        ];
        echo json_encode($result);
        die();

    }

    try {
        
        $query ="   INSERT 
                    INTO Account 
                    VALUES (:username,:password,:domanda,:risposta)";

        $statement = $pdo->prepare($query);
        $statement->bindValue('username', $username);
        $statement->bindValue('password', md5($password));
        $statement->bindValue('domanda', $domanda);
        $statement->bindValue('risposta', $risposta);
        $statement->execute();

        // Login
        $_SESSION['logged'] = true;
        $_SESSION['username'] = $username;

        $result = [
            'logged'    => true,
            'user'      => $username,
            'message'   => 'Register avvenuto con successo'
        ];


    } catch (PDOException | Exception $e) {
        $result = [
            'logged'    => false,
            'message'   => $e->getMessage()
        ];
    }

    echo json_encode($result);

    $pdo = null;

?>


<?php

header('Content-Type: application/json');

// ottengo gli input
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


    // se la sessione non era attiva la attivo
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }


    // stabilisco la connessione
    $string = "mysql:host=127.0.0.1;dbname=Main";
    $user = "root";
    $password = "";
    $pdo;
    $result;

    try {
        // inizializzo il PDO
        $pdo = new PDO($string, $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        
        $result = [
            'logged'    => false,
            'message'    => $e->getMessage()
        ];
        echo json_encode($risultato);
        die();

    }

    try {
        
        $query =    "INSERT 
                    INTO Account (Username, Password, Domanda, Risposta) 
                    VALUES (:username,:password,:domanda,:risposta) ";

        $statement = $pdo->prepare($query);
        $statement->bindValue('username', $input['username']);
        $statement->bindValue('password', md5($input['password']));
        $statement->bindValue('domanda', $input['domanda']);
        $statement->bindValue('risposta', $input['risposta']);
        $statement->execute();

        // Login
        $_SESSION['login'] = true;
        $_SESSION['username'] = $input['username'];

        $result = [
            'logged'    => true,
            'user'      => $input['username'],
            'message'   => 'register avvenuto con successo'
        ];


    } catch (PDOException | Exception $e) {
        $result = [
            'register'  => false,
            'message'     => $e->getMessage()
        ];
    }

    echo json_encode($result);

    $pdo = null;

?>

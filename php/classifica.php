
<?php

    header('Content-Type: application/json');
    
    session_start();

    // a questo punto posso procedere a connettermi con il databse
    $string = "mysql:host=127.0.0.1;dbname=dimatteo_641388";
    $user = "root";
    $pass = "";
    $pdo;

    try {
        // inizializzo il PDO
        $pdo = new PDO($string, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        
        $result = [
            'message' => $e->getMessage()
        ];
        echo json_encode($result);
        die();

    }

    try  {

        // 
        $query = "  SELECT username,SUM(points) as points
                    FROM game
                    GROUP BY username
                    ORDER BY points DESC";
        $statement = $pdo->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);


    } catch (PDOException | Exception $e){
    
        $result = [
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

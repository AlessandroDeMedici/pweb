<?php

// configurazione 
ini_set('display_errors','1');

$host = 'localhost';
$db   = 'Clinica';
$user = 'root';
$pass = '';

$dsn = "mysql:host=127.0.0.1;dbname=$db";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$pdo = new PDO($dsn, $user, $pass, $options);

function executeQuery($pdo, $sql) {
    try {
        $stmt = $pdo->prepare($sql); // Preparazione dello statement
        $stmt->execute(); // Esecuzione dello statement
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        return false; // Gestione degli errori
    }
}

?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Interfaccia Query Database</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <h1>Query DB</h1>
    <form method="POST">
        <input name="sql" id="input" />
        <button type="submit" id="confirm">Esegui Query</button>
    </form>

<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['sql'])) {
    $sql = $_POST['sql'];
    $first = 1;
    $results = executeQuery($pdo, $sql);
    if ($results === false) {
        echo "<p>Errore nell'esecuzione della query.</p>";
    } else {
        echo "<table border='1'>";
        foreach ($results as $row) {
            echo "<tr>";
            if ($first == 1){
                $first = 0;
                foreach ($row as $column => $value){
                    echo '<td class="title">' . $column . "</td>";
                }
                echo "</tr><tr>";
            }
            foreach ($row as $column => $value) {
                echo "<td>" . $value . "</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    }
}
?>

</body>
</html>

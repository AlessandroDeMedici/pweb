<?php

header('Content-Type: application/json');

$risultato = file_get_contents('php://input');

$risultato = json_decode($risultato);

// ritorno la risposta
echo json_encode($risultato);

?>
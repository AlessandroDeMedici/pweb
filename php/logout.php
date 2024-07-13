<?php 
    // riapro la sessione
    if (session_status() == PHP_SESSION_NONE){
        session_start();
    }
    $_SESSION['logged'] = false;
    $_SESSION['username'] = '';

?>
<?php 

    // procedo a chiudere la sessione
    session_destroy();

    // riapro la sessione
    session_start();

    $_SESSION['logged'] = false;

    $_SESSION['username'] = null;

?>
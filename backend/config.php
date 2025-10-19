<?php
// StyleMatch - Configuración de la base de datos
class Config {
    const DB_HOST = 'localhost';
    const DB_NAME = 'stylematch_db';
    const DB_USER = 'root';
    const DB_PASS = '';
    const DB_CHARSET = 'utf8mb4';
}

// Conexión a la base de datos
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . Config::DB_HOST . ";dbname=" . Config::DB_NAME . ";charset=" . Config::DB_CHARSET;
        $pdo = new PDO($dsn, Config::DB_USER, Config::DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
    }
}

// Iniciar sesión segura
function sec_session_start() {
    $session_name = 'sec_session_id';
    $secure = false; // Cambiar a true en producción con HTTPS
    $httponly = true;
    
    if (ini_set('session.use_only_cookies', 1) === FALSE) {
        header("Location: ../error.php?err=Could not initiate a safe session (ini_set)");
        exit();
    }
    
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params(
        $cookieParams["lifetime"],
        $cookieParams["path"],
        $cookieParams["domain"],
        $secure,
        $httponly
    );
    
    session_name($session_name);
    session_start();
    session_regenerate_id(true);
}
?>
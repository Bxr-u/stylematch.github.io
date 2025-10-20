<?php
header("Content-Type: application/json; charset=UTF-8");

try {
    $conn = new PDO("mysql:host=localhost", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Verificar si la base de datos existe
    $stmt = $conn->query("SHOW DATABASES LIKE 'stylematch_db'");
    $db_exists = $stmt->rowCount() > 0;
    
    if ($db_exists) {
        echo json_encode([
            "status" => "success",
            "message" => "La base de datos 'stylematch_db' existe"
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "La base de datos 'stylematch_db' NO existe. Ejecuta el archivo schema_updated.sql en MySQL."
        ]);
    }
    
} catch(PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Error de conexión: " . $e->getMessage()
    ]);
}
?>
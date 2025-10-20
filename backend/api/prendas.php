<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include_once '../database/connection.php';

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT p.*, c.nombre as costurero_nombre 
              FROM catalogo_prendas p 
              LEFT JOIN costureros c ON p.costurero_id = c.id 
              WHERE p.activa = 1";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $prendas = [];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // Convertir JSON de colores a array
        if ($row['colores']) {
            $row['colores'] = json_decode($row['colores'], true);
        }
        $prendas[] = $row;
    }
    
    echo json_encode($prendas);
    
} catch(PDOException $exception) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $exception->getMessage()));
}
?>
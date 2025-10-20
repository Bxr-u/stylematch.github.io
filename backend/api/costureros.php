<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// RUTA CORRECTA: connection.php (con doble n)
include_once '../database/connection.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        getCostureros($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método no permitido."));
}

function getCostureros($db) {
    try {
        $query = "SELECT c.* 
                  FROM costureros c
                  WHERE c.activo = 1";
        
        // Aplicar filtros
        $filters = [];
        if(isset($_GET['ciudad']) && $_GET['ciudad'] != 'all') {
            $filters[] = "c.ciudad = '" . $_GET['ciudad'] . "'";
        }
        if(isset($_GET['especialidad']) && $_GET['especialidad'] != 'all') {
            $filters[] = "c.especialidad LIKE '%" . $_GET['especialidad'] . "%'";
        }
        
        if(count($filters) > 0) {
            $query .= " AND " . implode(" AND ", $filters);
        }
        
        $query .= " ORDER BY c.rating DESC";
        
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $costureros = [];
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $costureros[] = $row;
        }
        
        echo json_encode($costureros);
        
    } catch(PDOException $exception) {
        http_response_code(500);
        echo json_encode(array("message" => "Error: " . $exception->getMessage()));
    }
}
?>
<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once __DIR__ . '/../database/connection.php';
include_once __DIR__ . '/../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

// Obtener datos RAW del POST
$input = file_get_contents("php://input");
$data = json_decode($input);

// Debug: ver qué está llegando
error_log("=== REGISTER DEBUG ===");
error_log("Input recibido: " . $input);
error_log("JSON decode: " . print_r($data, true));
error_log("Método: " . $_SERVER['REQUEST_METHOD']);

if($data && !empty($data->nombre) && !empty($data->email) && !empty($data->password)) {
    
    error_log("Todos los campos presentes");
    
    // Verificar si el email ya existe
    $user->email = $data->email;
    if($user->emailExists()) {
        http_response_code(409);
        echo json_encode([
            "message" => "El email ya está registrado.",
            "success" => false
        ]);
        exit();
    }
    
    // Crear usuario
    $user->nombre = $data->nombre;
    $user->email = $data->email;
    $user->password_hash = password_hash($data->password, PASSWORD_DEFAULT);
    
    if($user->create()) {
        http_response_code(201);
        echo json_encode([
            "message" => "Usuario registrado exitosamente.",
            "success" => true
        ]);
    } else {
        http_response_code(503);
        echo json_encode([
            "message" => "No se pudo registrar el usuario.",
            "success" => false
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "message" => "Datos incompletos.",
        "success" => false,
        "received_data" => $data,
        "input_raw" => $input
    ]);
}
?>
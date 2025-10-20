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

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)) {
    $user->email = $data->email;
    
    if($user->emailExists()) {
        if(password_verify($data->password, $user->password_hash)) {
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login exitoso.",
                "success" => true,
                "user_id" => $user->id,
                "nombre" => $user->nombre,
                "email" => $user->email
            ));
        } else {
            http_response_code(401);
            echo json_encode(array(
                "message" => "Contraseña incorrecta.",
                "success" => false
            ));
        }
    } else {
        http_response_code(404);
        echo json_encode(array(
            "message" => "Usuario no encontrado.",
            "success" => false
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Datos incompletos.",
        "success" => false
    ));
}
?>
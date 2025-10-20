<?php
echo "<h2>Debug Information</h2>";

// 1. Verificar que PHP funciona
echo "PHP está funcionando: Sí<br>";

// 2. Verificar rutas de archivos
$connection_path = __DIR__ . '/../database/connection.php';
echo "Ruta a connection.php: " . $connection_path . "<br>";
echo "Archivo existe: " . (file_exists($connection_path) ? "Sí" : "No") . "<br>";

// 3. Verificar si podemos incluir el archivo
if (file_exists($connection_path)) {
    include_once $connection_path;
    echo "Archivo incluido: Sí<br>";
    
    // 4. Probar la clase Database
    try {
        $database = new Database();
        echo "Clase Database cargada: Sí<br>";
        
        $db = $database->getConnection();
        echo "Conexión a BD establecida: " . ($db ? "Sí" : "No") . "<br>";
        
    } catch(Exception $e) {
        echo "Error al crear Database: " . $e->getMessage() . "<br>";
    }
} else {
    echo "ERROR: No se puede encontrar connection.php<br>";
    echo "Directorios disponibles:<br>";
    $files = scandir(__DIR__ . '/../database/');
    foreach($files as $file) {
        echo "- " . $file . "<br>";
    }
}
?>
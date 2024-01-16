<?php
header('Content-Type: application/json');

// Reemplaza con tus detalles de conexión
$servername = "localhost";
$username = "umilpdfe_masusr";
$password = "masyros126";
$dbname = "umilpdfe_masyros";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Consulta SQL para resetear los contadores (ajusta según tu esquema de base de datos)
$sql = "DELETE FROM usuarios";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("message" => "Contadores reseteados exitosamente"));
} else {
    echo json_encode(array("message" => "Error al resetear contadores: " . $conn->error));
}

$conn->close();
?>

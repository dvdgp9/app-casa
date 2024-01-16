<?php
// Detalles de conexión
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

// Obtener los datos enviados desde el script JS
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

// Asegúrate de que la tarea y el usuario están establecidos
if(isset($decoded['task']) && isset($decoded['user'])) {
    $task = $decoded['task'];
    $user = $decoded['user'];

    // Reemplaza 'nombre_tabla' con el nombre de tu tabla y las columnas según corresponda
    $sql = "INSERT INTO usuarios (id_usuario, id_tarea, fecha_hora) VALUES ('$user', '$task', CURRENT_TIMESTAMP)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Nuevo registro creado exitosamente"));
    } else {
        echo json_encode(array("message" => "Error: " . $sql . "<br>" . $conn->error));
    }
} else {
    echo json_encode(array("message" => "Error: Datos incompletos"));
}

$conn->close();
?>

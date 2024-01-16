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

// Asumiendo que tienes una tabla 'usuarios' con columnas 'id_usuario', 'id_tarea', y 'fecha_hora'
$sql = "SELECT id_usuario, id_tarea, COUNT(*) as count FROM usuarios GROUP BY id_usuario, id_tarea";

$result = $conn->query($sql);

$taskCounts = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        array_push($taskCounts, array(
            "user" => $row["id_usuario"],
            "task" => $row["id_tarea"],
            "count" => $row["count"]
        ));
    }
} else {
    echo "0 results";
}

echo json_encode($taskCounts);

$conn->close();
?>

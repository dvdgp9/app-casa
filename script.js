document.addEventListener('DOMContentLoaded', (event) => {
    let selectedTask = null;
    let selectedUser = null;

    // Event listeners para botones de tareas
    const taskButtons = document.querySelectorAll('.task-button');
    taskButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedTask = this.getAttribute('data-task');
            // Resalta el botón seleccionado
            taskButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Event listeners para botones de usuarios
    const userButtons = document.querySelectorAll('.user-button');
    userButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedUser = this.getAttribute('data-user');
            // Resalta el botón seleccionado
            userButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Event listener para el botón de envío
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', function() {
        if(selectedTask && selectedUser) {
            // Aquí enviaríamos los datos al servidor
            sendDataToServer(selectedTask, selectedUser);
        } else {
            alert('Por favor, selecciona una tarea y un usuario antes de enviar.');
        }
    });

    // Función para enviar datos al servidor
    function sendDataToServer(task, user) {
        // Suponiendo que tienes un endpoint en tu servidor para recibir estos datos
        const endpoint = '/task_record.php';
        const data = {
            task: task,
            user: user
        };

fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Llamar a la función para actualizar la tabla después de una inserción exitosa
            updateTaskTable(); // Añade esta línea
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

// Función para actualizar la tabla de tareas
function updateTaskTable() {
    fetch('get_task_counts.php')
    .then(response => {
        if(response.ok) {
            return response.json();  // Si la respuesta está bien, intenta convertirla a JSON
        } else {
            throw new Error('Response not OK');  // Si no, lanza un error
        }
    })
    .then(data => {
        // Aquí actualizas los elementos de la tabla con los datos recibidos
        for (let task of data) {
            const cell = document.getElementById(`${task.user}-${task.task}`);
            if (cell) {
                cell.textContent = task.count;
            }
        }
    })
    .catch(error => {
        console.error('Error fetching task data:', error);  // Aquí manejas cualquier error que ocurra en el proceso
    });
}

    // Llamar a updateTaskTable() cuando se cargue la página para cargar los datos iniciales
    updateTaskTable();

        // Event listener para el botón de reseteo
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', function() {
        // Confirmar antes de resetear
        if(confirm('¿Estás seguro de que quieres resetear todos los contadores?')) {
            resetTaskCounts();
        }
    });

    // Función para resetear los contadores
    function resetTaskCounts() {
        fetch('reset_task_counts.php', { method: 'POST' })
        .then(response => {
            if(response.ok) {
                return response.json();  // Si la respuesta está bien, intenta convertirla a JSON
            } else {
                throw new Error('Response not OK');  // Si no, lanza un error
            }
        })
        .then(data => {
            console.log('Success:', data);
            // Actualizar la tabla después de resetear
            updateTaskTable();
        })
        .catch(error => {
            console.error('Error fetching task data:', error);  // Aquí manejas cualquier error que ocurra en el proceso
        });
    }


});

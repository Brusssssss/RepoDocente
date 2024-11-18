const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Ruta para obtener los datos
app.get('/docentes', (req, res) => {
  fs.readFile(path.join(__dirname, 'docentes.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo JSON' });
    }
    res.json(JSON.parse(data));  // Retorna los datos del JSON
  });
});

// Ruta para actualizar los datos de los docentes (PUT)
app.put('/docentes', (req, res) => {
  const updatedDocente = req.body; // Los datos del docente que se actualizarán
  docentes[0] = updatedDocente; // Actualizamos el primer docente (puedes adaptar este código para múltiples docentes)
  res.status(200).json(updatedDocente); // Respondemos con los datos actualizados
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

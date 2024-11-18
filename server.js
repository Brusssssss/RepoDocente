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

// Ruta para actualizar los datos
app.put('/docentes', (req, res) => {
  const updatedDocentes = req.body;

  // Guarda los datos actualizados en el archivo JSON
  fs.writeFile(path.join(__dirname, 'docentes.json'), JSON.stringify(updatedDocentes, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el archivo JSON' });
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

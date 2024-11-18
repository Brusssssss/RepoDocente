const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para obtener los datos
app.get('/docentes', (req, res) => {
  fs.readFile('./docente.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo JSON' });
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para actualizar el perfil
app.put('/docentes', (req, res) => {
  const newData = req.body;

  fs.writeFile('./docente.json', JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al escribir en el archivo JSON' });
    }
    res.json({ message: 'Perfil actualizado correctamente' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

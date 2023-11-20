const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// Endpoint para listar contactos
app.get('/getAgenda', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los contactos.' });
  }
});

// Endpoint para almacenar un nuevo contacto
app.post('/saveContact', async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;
    console.log(nombre, apellido, telefono)
    if (!nombre || !apellido || !telefono) {
      return res.status(400).json({ error: 'Nombre, apellido y teléfono son campos obligatorios.' });
    }
    const response = await axios.post('http://www.raydelto.org/agenda.php', {
      nombre,
      apellido,
      telefono,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al almacenar el contacto.' });
  }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
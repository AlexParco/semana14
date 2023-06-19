const mongoose = require('mongoose')
const URL_CONECTION = 'htpp'

mongoose.connect('mongodb://127.0.0.1:27017/lab14v2')

mongoose.connection.on('connected', () => {
  console.log("Mongoose connected")
})
mongoose.connection.on('disconnected', () => {
  console.log("Mongoose Disconnected")
})
mongoose.connection.on('error', () => {
  console.log("Mongoose Error")
})

module.exports = mongoose


// Definición del modelo Pilot
const PilotoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  flightHours: {
    type: Number,
    required: true
  }
});

const Pilot = mongoose.model('Piloto', PilotoSchema);

const MiembroSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Miembro = mongoose.model('Miembro', MiembroSchema);

// Definición del modelo Aircraft
const AvionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  maintenanceBase: {
    type: String,
    required: true
  }
});

const Avion = mongoose.model('Avion', AvionSchema);

// Definición del modelo Flight
const VueloSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  avion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Avion'
  },
  piloto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Piloto' 
  },
  miembros: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro' 
  }]
});

const Vuelo = mongoose.model('Vuelo', VueloSchema);

// Ejemplo de uso
async function createFlight() {
  // Crear un piloto
  const pilot = new Pilot({
    code: 'P001',
    name: 'John Doe',
    flightHours: 500
  });

  await pilot.save();

  const crewMember1 = new Miembro({
    code: 'C001',
    name: 'Jane Smith'
  });

  const crewMember2 = new Miembro({
    code: 'C002',
    name: 'Michael Johnson'
  });

  await Promise.all([crewMember1.save(), crewMember2.save()]);

  const aircraft = new Avion({
    code: 'A001',
    type: 'BOEING-747',
    maintenanceBase: 'Base1'
  });

  await aircraft.save();

  const flight = new Vuelo({
    flightNumber: 'IB-8830',
    origin: 'Palma',
    destination: 'Alicante',
    time: new Date(),
    avion: aircraft._id,
    piloto: pilot._id,
    miembros: [crewMember1._id, crewMember2._id]
  });

  await flight.save();

  console.log('Vuelo creado con éxito');
}

// Conex

module.exports = {
    createFlight,
    Vuelo,
    Avion,
    Miembro,
    Pilot
}
const express = require('express')
const app = express()
const { createFlight, Pilot, Miembro, Avion, Vuelo} = require('./models/modelos')
const { jsPDF } = require('jspdf')
const moment = require('moment')
require('jspdf-autotable');

// createFlight()
// rutas habilitadas
// 'http://localhost:4000/reportpdf/vuelos'

// 'http://localhost:4000/reportpdf/avion'
// 'http://localhost:4000/reportpdf/piloto'

app.get('/reportpdf/vuelos', async (req, res, next) => {
    try {
        const vuelos = await Vuelo.find().populate('avion')
                                        .populate('piloto')
                                        .populate('miembros')
        const doc = new jsPDF()
        doc.autoTable({
            head: [['Numero de Vuelo', 'Origen', 'Destino', 'Tiempo', 'avion', 'piloto', 'miembros']],
            body: vuelos.map(obj => [
                obj.flightNumber, obj.origin, obj.destination, moment(obj.time).format('YYYY-MM-DD HH-MM'),
                obj.avion.type, obj.piloto.name, obj.miembros.length
            ])
        })

        // miembros
        let tempMiembro = []
        vuelos.forEach(obj => {
            tempMiembro = obj.miembros.map( e => [
                obj.flightNumber, e.code, e.name
            ])
        })
        doc.autoTable({
            head: [['Numero de Vuelo', 'Code', 'Name']],
            body: tempMiembro
        })

        //avion
        doc.autoTable({
            head: [['Numero de Vuelo', 'Code', 'Tipo', 'Base de mantenimient']],
            body: vuelos.map(obj => [
                obj.flightNumber, obj.avion.code, obj.avion.type, obj.avion.maintenanceBase
            ])
        })

        //piloto
        doc.autoTable({
            head: [['Numero de Vuelo', 'Code', 'name', 'Hora de vuelo']],
            body: vuelos.map(obj => [
                obj.flightNumber, obj.piloto.code, obj.piloto.type, obj.piloto.flightHours
            ])
        })
        const nombreArchivo = 'Miembros.pdf'; 

        res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
        res.setHeader('Content-Type', 'application/pdf');

        res.contentType('application/pdf');
        res.send(Buffer.from(doc.output('arraybuffer')));
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.get('/vuelos', async (req, res, next) => {
    try {
        const vuelos = await Vuelo.find().populate('avion')
                                        .populate('piloto')
                                        .populate('miembros')
        res.send(vuelos)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.post('/create/vuelo', async (req, res, next) => {
    try {
        const param = req.body  
        const vuelos = await Vuelo.find(param)
        res.send(vuelos)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.post('/create/avion', async (req, res, next) => {
    try {
        const param = req.body  
        const vuelos = await Avion.find(param)
        res.send(vuelos)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.post('/create/miembro', async (req, res, next) => {
    try {
        const param = req.body  
        const vuelos = await Miembro.find(param)
        res.send(vuelos)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.post('/create/piloto', async (req, res, next) => {
    try {
        const param = req.body  
        const vuelos = await Pilot.find(param)
        res.send(vuelos)
    } catch (error) {
        console.log(error)
        next(error)
    }
})



app.use((
  err,
  req,
  res,
  next,
) => {
console.log(error)
  res
    .status("error en el vuelo")
    .send(400)
})


app.listen('4000', () => {
    console.log('Server is listening')
})
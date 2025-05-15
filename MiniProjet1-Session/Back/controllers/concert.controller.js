const concertService = require("../services/concert.service");

exports.getAllConcert = (req, res) => {
    concertService.getAllConcert((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getConcertByIsId = (req, res) => {
    let id = req.query.id
    concertService.getConcertByIsId(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getConcertById = (req, res) => {
    let id = req.query.id
    concertService.getConcertById(id,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.updateConcert = (req, res) => {
    let id = req.query.id_activite
    let type = req.body.type_concert
    concertService.updateConcert(id,type,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.createConcert = (req, res) => {
    let id = req.body.id_activite
    let type = req.body.type_concert
    concertService.createConcert(id,type,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.deleteConcertType = (req, res) => {
    let type = req.body.type
    concertService.createConcert(type,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

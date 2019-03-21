const express = require('express')
var bodyParser = require('body-parser')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const pgp = require('pg-promise')()
const db = pgp('postgres://nwcvragt:tlVmxF2fRKcAcDIzqB6TTSGCHnWFT8Cf@isilo.db.elephantsql.com:5432/nwcvragt')
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())

    server.get('/notes', (req, res, next) => {
        db.any('SELECT * from note;')
        .then(function (data) {
          res.json(data);
        })
        .catch(function (error) {
          res.send(error);
        })
    })

    server.post('/notes', (req, res, next) => {
      db.none('INSERT INTO note(title,content) VALUES($1, $2);', [req.body.title, req.body.content])
      .then(function () {
        console.log("New note inserted succesfully")
        res.sendStatus(200)
      })
      .catch(function (error) {
        console.log("New note insertion error")
        console.error(error)
      })
    })

    server.put('/notes/:id', (req, res, next) => {
      db.none('Update note set title = $2, content = $3 where id = $1;', [req.params.id, req.body.title, req.body.content])
      .then(function () {
        console.log("Note edited succesfully")
        res.sendStatus(200)
      })
      .catch(function (error) {
        console.log("Note edition error")
        console.error(error)
      })
    })

    server.delete('/notes/:id', (req, res, next) => {
      db.none('DELETE FROM note where id = $1;', [req.params.id])
      .then(function () {
        console.log("Note deleted succesfully")
        res.sendStatus(200)
      })
      .catch(function (error) {
        console.log("Note deletion error")
        console.error(error)
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
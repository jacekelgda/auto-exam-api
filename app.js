const express = require('express')
const app = express()
const router = new express.Router()
const bodyParser = require('body-parser')
const test = require('./test')
const api = require('./api')

app.set('port', (process.env.PORT || 8080))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
api.updateHash()

router.post('/solutions', function (req, res) {
  api.updateHash()
  test.performTest(req.body.url, api.getHash())
  res.send('THX!')
})

router.get('/code', function (req, res) {
  res.send(api.getHash())
})

app.use('/api', router);
app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'))
})

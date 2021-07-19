const express = require('express')
const basicAuth = require('basic-auth-connect')
const app = express()

const USERNAME = 'itlab'
const PASSWORD = 'net_daisuki'

app.use(basicAuth(USERNAME, PASSWORD))

// コンテンツはpublicディレクトリに存在
app.use(express.static('public'))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})
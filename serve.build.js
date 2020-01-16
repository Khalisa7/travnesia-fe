const express = require("express");
const compression = require('compression')
const path = require("path")
const DIST_DIR = path.join(__dirname, "dist")
const helmet = require("helmet")
const app = express()

app.use(helmet())
app.disable("x-powered-by")
app.disable('etag')

// define static resource
app.use(express.static(DIST_DIR))

//Using gzip compression
app.use(compression())

// middleware for Express to return .js.gz
app.get('*.js', function (req, res, next) {
	req.url = req.url + '.gz'
	res.set('Content-Encoding', 'gzip')
	next()
})

// return index.html when accessing all routes
app.get('*', function (req, res, next) {
	res.sendFile(path.join(DIST_DIR, "index.html"))
})

// Run server in port 80
app.listen(6001, () =>
	console.log("Listening on port 3000!")
)
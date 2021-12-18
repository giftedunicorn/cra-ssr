import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'
const app = express()
const PORT = 3000;

app.use('^/$', (req, res, next) => {
	// now it only server the production build
	fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        return res.status(500).send("Some error happened")
      }
      
      // replace the UI
      return res.send(
      	data.replace(
      		'<div id="root"></div>', 
      		`<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      		)
      	)
    })
})

// without this code, the static js and css will be missing from client side
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
})

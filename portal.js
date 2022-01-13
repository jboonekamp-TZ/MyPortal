const express = require('express');
const ejs = require('ejs');
const path = require('path');
const http = require('http');

const conf = require('./config.json');

// Import error classes(Add classes to object as necessary)
const { AppInitializationError, InvalidRequest } = require('./components/errors')(conf)

// Initialize router
let router = express();

// Initialize server
const server = http.createServer(router);

// Initialize view engine
router.set('view engine', 'ejs');
router.set('views', 'views');

async function addSubApp(AppName, dependencies) {
    if(!conf.apps.currentRegistry.includes(AppName)) throw new AppInitializationError(`AppName ${AppName} not listed under current registery in config`)
}

// Initialize apps here
let dependencies = { express, ejs, path };
let { app, appName } = (require('./Messenga/app')(dependencies))

// console.log(messengaAppImport.app, messengaAppImport.appName)
router.use(`/${appName}`, app)

router.get('/', (req, res) => {
    res.render('portal')
})

router.use('*', (req, res) => {
    let regEx = new RegExp('(?<=\/)([A-z]+)', 'g');
    let targetPage = (req.baseUrl).matchAll(/(?<=\/)([A-z]+)/gi)
    console.log(targetPage[0]);
    return;
    let e = new InvalidRequest('Message', )
    res.render('errorPage', resObj)
})

// Launch the server on port
server.listen(conf.host.port, () => {
    console.log(`Server launched on port ${conf.host.port}`)
})
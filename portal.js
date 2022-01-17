const express = require('express');
const ejs = require('ejs');
const path = require('path');
const http = require('http');

const conf = require('./config.json');

// Import error classes(Add classes to object as necessary)
const { AppInitializationError, InvalidRequest } = require('./components/errors')(conf)
const { generateConnection } = require('./components/app.db')(conf)

// Initialize router
let router = express();

// Initialize server
const server = http.createServer(router);

// Initialize view engine
router.set('view engine', 'ejs');
router.set('views', 'views');

generateConnection(true);

// Configure static files for the portal
router.use(express.static(path.join(__dirname, `portalPublic/`)))

// App entry point is the name of the app main script
function initializeSubApplication(AppName, AppEntryPoint, dependencies) {

    console.log(`Initializing ${AppName} at ${AppEntryPoint}.js`)

    let msg;

    // Validate parameters to ensure app is created successfully
    if(!AppName || !AppEntryPoint) msg = (`App: ${AppName} failed to initialize. AppName or AppEntryPoint must be specified`)
    if(!conf.apps.currentRegistry.includes(AppName)) msg = (`App ${AppName} not listed under current registery in config`);
    if(typeof dependencies !== 'object') msg = (`App ${AppName} failed to launch. Dependencies not type: object`)
    if(msg) throw new AppInitializationError(msg);

    // Inject dependencies and import the app.
    const app = require(`./${AppName}/${AppEntryPoint}`)(dependencies)

    // Configure the router to use the app routes, on /${AppName}
    router.use(`/${AppName}`, app);
    
    console.log(`${AppName} initialized ON /${AppName}`);

}

// Initialize apps here
// Messenga
initializeSubApplication('Messenga', 'app', { express, ejs, path })

router.get('/', (req, res) => {
    res.render('portal', {Content: null})
})

router.all('/register', (req, res, next) => {

    let resObj = {}, resType = "render", page = "Portal", statCode;

    switch (req.method) {
        case "GET":
            
            resObj.Content = "Register";

            break;
    
        case "POST":
        
            break;

        
        default:
            break;

    }

    res.status(statCode || 200)[resType](page, resObj)
})

router.all('/login', (req, res, next) => {

    let resObj = {}, resType = "render", page = "Portal", statCode;

    switch (req.method) {
        case "GET":
            
            resObj.Content = "Login";

            break;
    
        case "POST":
        
            break;

        
        default:
            break;

    }

    res.status(statCode || 200)[resType](page, resObj)
})

router.use('*', (req, res) => {
    // Insert bad page handle
    return res.send('errorPage')
    let e = new InvalidRequest('Message', )
    res.render('errorPage', resObj)
})

// Launch the server on port
server.listen(conf.host.port, () => {
    console.log(`Server launched on port ${conf.host.port}`)
})
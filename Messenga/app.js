module.exports = function(dependencies){

    const { express, ejs, path } = dependencies

    const appName = `Messenga`;

    const app = express();

    var session = require('express-session');

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
      }))

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, `public/`)))

    app.get('/', (req, res) => {
        let resObj = {}, page = "home";
        resObj.Content = "home";
        resObj.AppName = appName;
        res.render(page, resObj);
    })

    app.get('/home', (req, res) => {
        let resObj = {}, page = "home";
        resObj.Content = "home";
        resObj.AppName = appName;

        // render the page
        // Client side we get the messages and render the object with the db attributes
        res.render(page, resObj);
    })

    app.get('/chat', (req, res, next) => {
        console.log(req)
        let resObj = {}, page = "Home";
        resObj.Content = "chatWindow"
        resObj.AppName = appName;
        console.log(resObj)
        res.render(page, resObj);
    })

    // app.post('/sendFiles', (req, res, next) => {
    //     if(req.body)
    // })

    // Global message board clearer event handler
    setInterval(() => {

        // Here we clear the global message db clear call
        // await clearMessageBoard();

    }, 24*60*60*1000)

    return app;

}
module.exports = function(dependencies){

    const { express, ejs, path } = dependencies

    const appName = `Messenga`;
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, `public/`)))

    app.get('/', (req, res) => {
        let resObj = {}, page = "home";
        resObj.Content = "home";
        resObj.AppName = appName;
        res.render(page, resObj);
    })

    app.get('/chat', (req, res, next) => {
        let resObj = {}, page = "Home";
        resObj.Content = "chatWindow"
        resObj.AppName = appName;
        console.log(resObj)
        res.render(page, resObj);
    })

    app.all('/register', (req, res, next) => {

        let resObj = {}, resType = "render", page = "Home", statCode;

        switch (req.method) {
            case "GET":
                
                resObj.AppName = appName;
                resObj.Content = "Register";

                break;
        
            case "POST":
            
                break;

            
            default:
                break;

        }

        res.status(statCode || 200)[resType](page, resObj)
    })

    app.all('/login', (req, res, next) => {

        let resObj = {}, resType = "render", page = "Home", statCode;

        switch (req.method) {
            case "GET":
                
                resObj.AppName = appName;
                resObj.Content = "Login";

                break;
        
            case "POST":
            
                break;

            
            default:
                break;

        }

        res.status(statCode || 200)[resType](page, resObj)
    })

    app.post('/sendFiles', (req, res, next) => {

    })

    return {
        app: app,
        appName: appName
    }

}
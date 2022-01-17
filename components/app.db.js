const { MongoClient } = require("mongodb");

module.exports = (conf) => {

    let collectionsConfig;

    async function generateConnection(isInitial){

        if(isInitial){
            let db;
            MongoClient.connect(`mongodb+srv://${conf.mongodb.username}:${conf.mongodb.password}@cluster0.mixti.mongodb.net/?maxPoolSize=20&w=majority`, (err, adminDb) => {
                if(err) throw new Error(`Initial admin database pull failed: ${err}`);
                adminDb.admin().listDatabases((err, result) => {
                    if(err) throw new Error(`Initial admin database pull failed: ${err}`);
    
                    collectionsConfig = result.databases.map(d=>{
                        console.log(d)
                    })
                })
            })
        }else{
            const uri = `mongodb+srv://${conf.mongodb.username}:${conf.mongodb.password}@cluster0.mixti.mongodb.net/Messenga?retryWrites=true&w=majority`;
        
            const conn = new MongoClient(uri);
        }

        if(await verifyConn(conn) & !isInitial) return conn;


        
        throw new Error('Mongodb connection to cluster0 failed');

    }

    async function postToCollection(conn, databaseName, collectionName, postData){
        if(!conn) conn = await generateConnection();
        if(!databaseName || typeof databaseName !== "string") throw new Error('Invalid databaseName: Must be a string');
        if(!collectionName || typeof collectionName !== "string") throw new Error('Invalid collectionName: Must be a string');
        if(!postData || typeof postData !== "object") throw new Error('Invalid postData: Must be an object');

        let db = client.db(databaseName);

        db.collection(collectionName)


    }

    async function verifyConn(conn){
        try{

            await conn.connect()

            await conn.db("Admin").command({ping: 1})

        }
        catch (e){

            console.log(e);

            await client.close()

            return false;

        }
        
    }

    return {
        collectionsConfig,
        generateConnection
    }
}

    

    


const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = ' mongodb://marti:jukebox75@cluster0-shard-00-00.zfoh7.mongodb.net:27017,cluster0-shard-00-01.zfoh7.mongodb.net:27017,cluster0-shard-00-02.zfoh7.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-awgjuh-shard-0&authSource=admin&retryWrites=true&w=majority';
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);
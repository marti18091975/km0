const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = ' mongodb://marti:jukebox75@cluster0-shard-00-00.zfoh7.mongodb.net:27017,cluster0-shard-00-01.zfoh7.mongodb.net:27017,cluster0-shard-00-02.zfoh7.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-awgjuh-shard-0&authSource=admin&retryWrites=true&w=majority';

const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("people");

        // Construct a document                                                                                                                                                              
        let personDocument = {
            "name": { "first": "Alan", "last": "Turing" },
            "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
            "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
            "contribs": ["Turing machine", "Turing test", "Turingery"],
            "views": 1250000
        }

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(personDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);
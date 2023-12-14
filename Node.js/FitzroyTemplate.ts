const {MongoClient} = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  'mongodb+srv://BowlsBowlsBowls:ffqr3q80qVZHy2y4@lawnbowls.abz4cdn.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db('BowlsBowlsBowls');
    const coll = db.collection('Competitions');

    // insert code goes here

   
    type competion = {
        name: string,
        division: number,
        section: number,
        region: string,
      }

      const docs = [
      {
        name: 'Wild2',
        officialName: '81P/Wild',
        orbitalPeriod: 6.41,
        radius: 1.5534,
        mass: 2.3e13,
      },
      {
        name: 'Comet Hyakutake',
        officialName: 'C/1996 B2',
        orbitalPeriod: 17000,
        radius: 0.77671,
        mass: 8.8e12,
      },
    ];

    const result = await coll.insertMany(docs);

    // display the results of your operation
    console.log(result.insertedIds);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGO_CONNECTION_STRING;

let cachedDb = null;

async function connectToDatabase() {
  try {
    if (cachedDb) {
      return cachedDb;
    }

    const client = await MongoClient.connect(MONGODB_URI);
    const db = await client.db("appFacilitaDb");
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

exports.handler = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase();
    const frequenciaCollection = db.collection('frequencia');
    
    const body = JSON.parse(event.body);

    if (!body || !body.matricula) {
      // Handle invalid input
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Invalid input',
        }),
      };
    }

    const matricula = parseInt(body.matricula);
    const teste = 123123123;

    if (isNaN(matricula) || isNaN(teste)) {
      // Handle invalid input
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Invalid input',
        }),
      };
    }

    const allEntries = await frequenciaCollection.countDocuments({ matricula: teste });
    const presencas = await frequenciaCollection.countDocuments({ matricula: matricula });

    const faltas = allEntries - presencas;

    if (presencas >= 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Frequência encontrada!',
          presencas: presencas,
          faltas: faltas,
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: 'Frequência não encontrada!',
        }),
      };
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Internal Server Error',
      }),
    };
  }
};
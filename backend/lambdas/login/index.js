const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGO_CONNECTION_STRING;

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(MONGODB_URI);

  const db = await client.db("appFacilitaDb");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();

  const users = await db.collection("users");
   if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: 'Corpo da requisição vazio.'
      })
    };
  }

  const body = JSON.parse(event.body);
  const matricula = Math.floor(parseInt(body.matricula));
  const senha = body.senha

  const user = await users.findOne({ matricula: matricula, senha: senha });
  
  if (user) {
    return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: `Login bem-sucedido!`
        })
    };
  } else {
    return {
        statusCode: 200,
        body: JSON.stringify({
          success: false,
          message: `Nome de usuário ou senha incorretos.`
        })
    };
  }
};

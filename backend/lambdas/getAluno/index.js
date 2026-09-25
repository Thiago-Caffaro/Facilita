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

  const alunos = await db.collection("alunos");
  
  const body = JSON.parse(event.body);
  
  const matricula = Math.floor(parseInt(body.matricula));

  const aluno = await alunos.findOne({ matricula: matricula});

  if (aluno) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            message: 'Aluno  encontrado!',
            alunoData: {aluno},
        })
    };
  } else {
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: false,
            message: 'Aluno não encontrado!',
            alunoData: null
        })
    };
  }

};
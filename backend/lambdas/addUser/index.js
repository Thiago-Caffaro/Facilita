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
  const users = await db.collection("users");
  
  const body = JSON.parse(event.body);
  
  const matricula = Math.floor(parseInt(body.matricula));
  const email = body.email;
  const senha = body.senha;

  const aluno = await alunos.findOne({ matricula: matricula });

  if (aluno){
    try {
        const data = {
            matricula: matricula,
            nome: aluno.nome,
            email: email,
            senha: senha
        }
        const userExist = await users.findOne({ matricula: matricula });
        
        if (userExist){
           return {
               statusCode: 500,
               body: JSON.stringify({
                    success: false,
                    message: `Erro ao cadastrar aluno: Aluno já cadastrado`
                })
            }
        }
        else {
            users.insertOne(data);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Usuário cadastrado com sucesso!'
                })
            };
        }
    } catch (erro){
        console.log(erro.stack); 
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: `Ocorreu um erro ao cadastrar o usuário: ${erro.stack}`
            })
        };
    }
  }
};

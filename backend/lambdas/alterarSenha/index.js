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
  
  const body = JSON.parse(event.body);
  
  const email = body.email;
  const novaSenha = body.novaSenha;
    
    try {
        const novaSenhaData = {
            $set: {
                senha: novaSenha
            },
        }
        const updated = await users.updateOne({ email: email }, novaSenhaData);
        
        if (updated){
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: `Senha alterada com sucesso!`
                })
            }
        }
        else {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    success: false,
                    message: 'A senha não foi alterada'
                })
            };
        }
    } catch (erro){
        console.log(erro.stack); 
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: `Ocorreu um erro ao alterar a senha do usuário: ${erro.stack}`
            })
        };
    }
};

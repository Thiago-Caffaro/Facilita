const nodemailer = require('nodemailer');

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
  const time = body.time;
  
  const user = await users.findOne({email: email});

  const nome = user.nome;
  const matricula = user.matricula;


  const gerarCodigo = (matricula, time) => {
    const str = (matricula * time).toString();
    const codigo = parseInt(str.substring(0, 6));

    return codigo;
  };

  try{
    const codigo = await gerarCodigo(matricula, time);
    const content = `
        Olá ${nome},

        Você solicitou a recuperação de sua senha. Para redefinir sua senha, copie o código abaixo no campo específico dentro do próprio aplicativo:

        Código de recuperação de senha: 
        
        ${codigo}
        
        Se você não solicitou a recuperação de senha, por favor, ignore este e-mail.
        
        Lembre-se, nunca compartilhe sua senha com ninguém, nem mesmo com nossa equipe de suporte. Mantenha suas informações seguras.
        
        Atenciosamente,
        Equipe de Suporte Facilita.
    `

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.SENHA
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Recuperação de Senha',
        text: content,
    };
    let info = await transporter.sendMail(mailOptions);
    console.log('Mensagem enviada: %s', info.messageId,"Codigo:", codigo);
    return {
      statusCode: 200,
      body: JSON.stringify({
        codigo: codigo
        }),
    };
    
  }
  catch (error){
    console.log('Erro ao executar função: ', error)
    throw new Error(`Erro ao executar função: ${error.message}`);
  }
};
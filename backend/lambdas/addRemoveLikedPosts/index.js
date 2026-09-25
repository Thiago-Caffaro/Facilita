import { MongoClient } from "mongodb";
const MONGODB_URI = process.env.MONGO_CONNECTION_STRING;

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db("appFacilitaDb");
  cachedDb = db;
  return db;
}

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  const likedPostsCollection = db.collection("likedPosts");

  let matricula;
  let providedPostId;
  let type;

  try {
    const body = JSON.parse(event.body);
    matricula = Math.floor(parseInt(body.matricula));
    providedPostId = body.postId; // Verifique se postId é uma string
    type = body.type;

    if (!matricula || !providedPostId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Parâmetros obrigatórios ausentes: matricula e postId são necessários.",
        }),
      };
    }

    // Encontrar o documento do usuário com a matrícula fornecida
    const userLikedPosts = await likedPostsCollection.findOne({ matricula: matricula });

    // Obter ou inicializar o objeto likedPostsIds
    const likedPostsIds = userLikedPosts?.likedPostsIds || { upVotes: [], downVotes: [] };

    // Verificar se o postId já está nos upVotes ou downVotes
    const isUpvoted = likedPostsIds.upVotes.includes(providedPostId);
    const isDownvoted = likedPostsIds.downVotes.includes(providedPostId);

    if (isUpvoted) {
      // Se já estiver upvotado, removê-lo
      likedPostsIds.upVotes = likedPostsIds.upVotes.filter(id => id !== providedPostId);
    } else if (isDownvoted) {
      // Se já estiver downvotado, removê-lo e adicionar um upvote
      likedPostsIds.downVotes = likedPostsIds.downVotes.filter(id => id !== providedPostId);
      likedPostsIds.upVotes.push(providedPostId);
    } else {
      // Se não estiver votado, adicionar um upvote ou downvote dependendo do type
      type == "upVote" ? likedPostsIds.upVotes.push(providedPostId) : likedPostsIds.downVotes.push(providedPostId);
      
    }

    // Atualizar o documento no MongoDB
    await likedPostsCollection.updateOne(
      { matricula: matricula },
      { $set: { likedPostsIds: likedPostsIds } },
      { upsert: true } // Cria o documento se ele não existir
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Operação realizada com sucesso!",
      }),
    };
  } catch (error) {
    console.error(error); // Log do erro para facilitar a depuração
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Erro de formato de entrada.",
      }),
    };
  }
};

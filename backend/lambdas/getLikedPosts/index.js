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
  try {
    const body = JSON.parse(event.body);
    matricula = Math.floor(parseInt(body.matricula));
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: 'Erro de formato de entrada.',
      }),
    };
  }

  const likedPosts = await likedPostsCollection.findOne({ matricula: matricula });
  const likedPostsIds = likedPosts ? likedPosts.likedPostsIds : null;

  if (likedPosts) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Posts encontrados!',
        likedPostsIds: likedPostsIds,
      }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: 'Posts não encontrados!',
        likedPostsIds: null,
      }),
    };
  }
};

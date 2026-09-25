const { Collection } = require("mongodb");

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

    const conectGradeHoraria = await db.collection('gradeHoraria');
    
    const body = JSON.parse(event.body);

    const turma = await body.turma;

    const gradeHoraria = await conectGradeHoraria.findOne({Turma: turma});

    if (gradeHoraria) {
        return {
            statusCode: 200,
            body: JSON.stringify({
            success: true,
            gradeHoraria: gradeHoraria,
            })
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Falha ao encontrar grade-horária',
            })
        };
    }

};

import mongoose from "mongoose";

async function main() {
    try {
        mongoose.connect(process.env.BD_CONNECTION_STRING, {
            writeConcern: {
                w: 'majority',
                j: true,
                wtimeout: 1000
            },
        });
        console.log("Conectado a Mongo Atlas");
    } catch (error) {
        console.error("Error al conectar con Mongo Atlas:", error);
    }
}
export default main
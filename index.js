//impor
import express  from "express";
import dotenv from "dotenv";
import cors from 'cors'
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js'


//var
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //el origen del req estra permitido
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}
// app.use(cors(corsOptions));
app.use(cors({
    origin: '*'
}));

//config
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

app.listen(PORT, ()=>{
    console.log(`En ejecucion en el puerto ${PORT}`);
})




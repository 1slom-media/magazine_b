import cors from 'cors';
import express, { Application } from 'express';
import { AppDataSource } from './data-source';
import router from './routes';


const app: Application = express();

const PORT = process.env.PORT || 9090

app.use(express.json());
app.use(cors())
AppDataSource.initialize().then((): void => console.log("connected")).catch((err: unknown): void => console.log(err));
app.use(router)


app.listen(PORT, (): void => console.log(`http://localhost:${PORT}`));
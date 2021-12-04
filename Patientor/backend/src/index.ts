import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientsRouter';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_request, response) => {

  response.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);


app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
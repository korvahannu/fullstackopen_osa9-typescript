import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());  // Parsettaa request.body json tiedoksi
const PORT = 3001;

app.get('/hello', (_request, response) => {
  
  return response.send('Hello Full Stack!');
  
});

app.get('/bmi', (request, response) => {
  
  const stats = request.query;

  if(isNaN(Number(stats.height)) || isNaN(Number(stats.weight)))
  {
    return response.status(404).json({error:'malformatted parameters'});
  }
  else
  {
    const result = {
      weight:stats.weight,
      height:stats.height,
      bmi: calculateBmi(Number(stats.height), Number(stats.weight))
    };
    return response.json(result);
  }

});

app.post('/exercises', (request, response) => {

  const { daily_exercises, target } = request.body;

  if(daily_exercises === null ||daily_exercises === undefined || target === null || target === undefined)
    return response.status(404).json({error:'parameters missing'});
  
  if(isNaN(Number(target)))
    return response.status(404).json({error:'malformatted parameters'});

  for(let i = 0; i < daily_exercises.length; i++)
  {
    if(isNaN(Number(daily_exercises[i])))
      return response.status(404).json({error:'malformatted parameters'});
  }

  const stats : number[] = [target, ...daily_exercises];

  return response.json(calculateExercises(stats));
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}


export const calculateExercises = (period : number[]) : Result => {
  const result : Result = {
    periodLength:0,
    trainingDays:0,
    success:false,
    rating:0,
    ratingDescription:'',
    target:0,
    average:0
  };

  /*
    Muuta siten, että ensimmäinen argumentti on target
  */

  result.target = period[0];

  result.periodLength = period.length -1;

  for(let i = 1; i < period.length; i++) {
    if(period[i] > 0)
      result.trainingDays++;
    
    result.average += period[i];
  }

  result.average /= result.periodLength;
  
  if(result.average >= result.target) {
    result.ratingDescription = 'Great work, you\'re an allstar!';
    result.rating = 3;
  }
  else if(result.average > result.target/2) {
    result.ratingDescription = 'Good job, but I know you can do better!';
    result.rating = 2;
  }
  else {
    result.ratingDescription = 'Not so good, next time we will do better!';
    result.rating = 1;
  }

  return result;
};

/*
const parseArgumentsAgain = (myArguments : string[]) : number[] => {

  let counter = 2;
  const result : number[] = [];

  while(!isNaN(Number(myArguments[counter]))) {
    result.push(Number(myArguments[counter]));
    counter++;
  }

  return result;
};

console.log(calculateExercises(parseArgumentsAgain(process.argv)));
*/
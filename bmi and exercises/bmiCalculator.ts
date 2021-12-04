/*interface stats {
  height: number;
  weight: number;
}*/

export const calculateBmi = (height : number, weight: number) : string => {

  const bmi = weight / (height/100) / (height/100);

  if(bmi < 16)
    return 'Underweight (Severe thinness)';
  else if (bmi < 17)
    return 'Underweight (Moderate thinness';
  else if(bmi < 18.5)
    return 'Underweight (Mild thinness';
  else if(bmi < 25)
    return 'Normal (healthy weight)';
  else if(bmi < 30)
    return 'Overweight (Pre-obese)';
  else if (bmi < 35)
    return 'Obese (Class 1)';
  else if (bmi < 40)
    return 'Obese (Class 2)';
  else
    return 'Obese (Class 3)';
};

/*
const parseArguments = (argumentsToParse : string[]) : stats => {

  if(argumentsToParse.length < 4 || argumentsToParse.length > 4) throw new Error('Invalid arguments');

  if(isNaN(Number(argumentsToParse[2]))
    ||isNaN(Number(argumentsToParse[3]))) {
      throw new Error('Invalid arguments');
    }
  else {
    return {
      height: Number(argumentsToParse[2]),
      weight: Number(argumentsToParse[3])
    };
  }
};

try {
  const args = parseArguments(process.argv);
  console.log(calculateBmi(args.height, args.weight));
}
catch(error) {
  let errorMessage = 'Something went wrong: ';

  if(error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage);
}
*/
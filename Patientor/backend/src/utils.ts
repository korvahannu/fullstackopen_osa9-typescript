import { v4 as  uuid } from 'uuid';
import { Patient, Entry, HealthCheckRating, Diagnose } from './types';

type Fields = { name:unknown, dateOfBirth: unknown, ssn: unknown, gender:unknown, occupation:unknown };

const convertToNewPatient = ({name, dateOfBirth, ssn, gender, occupation} : Fields) : Patient => {
  console.log("asd");
  const _name = parseToString(name);
  const _dateOfBirth = parseToString(dateOfBirth);
  const _ssn = parseToString(ssn);
  const _gender = parseToString(gender);
  const _occupation = parseToString(occupation);

  if(!Date.parse(_dateOfBirth))
    throw new Error('Invalid date format');
  
  const id : string = uuid();

  const patient : Patient = {
    id,
    name:_name,
    dateOfBirth:_dateOfBirth,
    ssn:_ssn,
    gender:_gender,
    occupation:_occupation,
    entries:[]
  };
  
  return patient;
};

type entryFields = { description: unknown, date: unknown,
  specialist: unknown, diagnosisCode?:unknown[],
  type: unknown, healthCheckRating?: unknown,
employerName?: unknown, sickLeave?: {startDate: unknown, endDate: unknown},
discharge?: {date:unknown, criteria:unknown}};


export const parseEntry = (entry:entryFields): Entry => {
  const id : string = uuid();
  const _description = parseToString(entry.description);
  const _date = parseToString(entry.date);
  const _specialist = parseToString(entry.specialist);

  const _type : "HealthCheck" | "OccupationalHealthcare" | "Hospital" = checkType(entry.type);

  let newEntry : Entry;

  switch(_type) {
    case "HealthCheck":
      if(!isValidField(entry.healthCheckRating))
        throw new Error('Missing health check rating for type HealthCheck')
      
      newEntry = {
        id,
        description:_description,
        date: _date,
        specialist:_specialist,
        type: _type,
        healthCheckRating: checkRating(entry.healthCheckRating)
      }
      break;
    
    case "Hospital":
      if(!isValidField(entry.discharge))
        throw new Error('Missing health check rating for type HealthCheck')

      newEntry = {
        id,
        description:_description,
        date: _date,
        specialist:_specialist,
        type: _type,
        discharge: checkDischarge(entry.discharge)
      }
      break;

    case "OccupationalHealthcare":
      if(!isValidField(entry.employerName) || !isString(entry.employerName))
        throw new Error('Missing required field for employer name')

        newEntry = {
          id,
          description:_description,
          date: _date,
          specialist:_specialist,
          type: _type,
          employerName:entry.employerName
        }

      let sickl : {startDate: string, endDate: string} | null = checkSickLeave(entry.sickLeave);

      if(sickl !== null)
        newEntry.sickLeave = sickl;
      
      break;
  }

  if(entry.diagnosisCode)
    newEntry.diagnosisCodes = checkDiagnosisCodes(entry.diagnosisCode);

  return newEntry;
}

const checkSickLeave = (field: any) : { startDate: string, endDate : string} | null => {

  let value = {
    startDate: "",
    endDate: ""
  }

  if(isValidField(field.startDate) && isString(field.startDate) && field.startDate !==  "") {
    if(Date.parse(field.startDate))
      value.startDate = field.startDate;
    else
      throw new Error('Inproper start date format')
  }

  if(isValidField(field.endDate) && isString(field.endDate)&& field.endDate !==  "") {
    if(Date.parse(field.endDate))
      value.endDate = field.endDate;
    else
      throw new Error('Inproper start date format')
  }
  
  if(value.startDate !== "" || value.endDate !== "")
    return value;
  else
    return null;
}

const checkDischarge = (field:any) : {date:string, criteria:string} => {
  console.log(field);
  if(!isValidField(field.date) ||!isString(field.date)
  || !isValidField(field.criteria) ||!isString(field.criteria))
  throw new Error('Your discharge -property is wrong, please check!');

  return {
    date: field.date,
    criteria: field.criteria
  }
}

const checkRating = (field:unknown) : HealthCheckRating => {

  if(!isValidField(field))
    throw new Error('Empty Health rating!');

  if(field === 0 ||field === "Healthy")
    return HealthCheckRating.Healthy;
  else if (field === 1 ||field==="LowRisk")
    return HealthCheckRating.LowRisk;
  else if (field === 2 ||field === "HighRisk")
    return HealthCheckRating.HighRisk;
  else if ( field === 3 || field === "CriticalRisk")
    return HealthCheckRating.CriticalRisk;
  throw new Error('Invalid Health rating!');
}

const checkDiagnosisCodes = (field: unknown[]) : Diagnose['code'][] => {

  let diagnoses:Diagnose['code'][] = [];

  field.forEach(diagnose => {
    if(!isValidField(diagnose) ||!isString(diagnose))
      throw new Error('Invalid diagnose');
    
    // Pitäisikö tarkistaa, että diagnoosi löytyy diagnosis-kannasta?
    diagnoses.push(diagnose);
  });

  return diagnoses;

};

const checkType = (field:unknown): "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
  if(!isValidField(field) ||!isString(field))
    throw new Error('Invalid entry type: ' + field);
  
  if(field !== "HealthCheck" && field !== "OccupationalHealthcare" && field !== "Hospital")
    throw new Error('Invalid entry type: ' + field);
  
  return field;
};

const parseToString = (field : unknown): string => {
  if(!isValidField(field) || !isString(field))
    throw new Error('Incorrect field: ' + field);
  
  return field;
};

const isString = (text:unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isValidField = (field : unknown): boolean => {
  if(field !== null && field !== undefined) {
    return true;
  }
  else
    return false;
};

export default convertToNewPatient;
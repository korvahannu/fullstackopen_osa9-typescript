import patients from '../../data/patients';
import { Patient, PublicPatient, Entry } from '../types';

const getAllPatientsNoSsn = () : PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const getAllPatients = () : Patient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, ssn, entries}) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      ssn,
      entries
    };
  });
};

const addPatient = (newPatient : any):Patient => {

  patients.push(newPatient);
  return newPatient;

};

const findPatientWithId = (id:string):Patient | undefined => {

  const patient = patients.find(patient => patient.id === id);
  return patient;

};

const addEntryToPatient = (id:string, entry:Entry):void => {

  patients.find(patient => patient.id === id)
  ?.entries
  .push(entry);

};

export default {
  getAllPatientsNoSsn,
  addPatient,
  findPatientWithId,
  getAllPatients,
  addEntryToPatient
};
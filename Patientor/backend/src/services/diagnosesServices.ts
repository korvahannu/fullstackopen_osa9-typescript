import diagnoses from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getAllDiagnoses = () : Diagnose[] => {
  return diagnoses;
};

export default {
  getAllDiagnoses
};
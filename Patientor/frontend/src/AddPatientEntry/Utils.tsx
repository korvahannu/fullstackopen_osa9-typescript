import { Diagnosis } from '../types';

export interface EntryFormValues {
  description:string;
  date: string;
  specialist: string;
  diagnosisCodes?:Diagnosis[];
  type: string;
  healthCheckRating?: number;
  employerName?:string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  },
  discharge?: {
    date: string;
    criteria: string;
  }
}
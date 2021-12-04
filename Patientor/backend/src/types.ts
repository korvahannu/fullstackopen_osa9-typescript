export interface Diagnose {
  code:string;
  name:string;
  latin?:string;
}

interface BaseEntry {
  id: string;
  description:string;
  date: string;
  specialist: string;
  diagnosisCodes?:Diagnose['code'][];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCaryEntry extends BaseEntry {
  type:"OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type:"Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HealthCheckEntry | OccupationalHealthCaryEntry | HospitalEntry;

export interface Patient {
  id:string;
  name:string;
  dateOfBirth:string;
  ssn:string;
  gender:string;
  occupation:string;
  entries:Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
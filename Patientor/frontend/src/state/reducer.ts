import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "GET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type :"REFRESH";
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_DIAGNOSES":
      return {
        patients: state.patients,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (list:Patient[]) : Action => {
  return {
    type:"SET_PATIENT_LIST",
    payload: list
  };
};

export const addPatient = (patient:Patient) : Action => {
  return {
    type:"ADD_PATIENT",
    payload:patient
  };
};

export const refresh = () : Action => {
  return {
    type:"REFRESH"
  };
};

export const setDiagnosesList = (list:Diagnosis[]) : Action => {
  return {
    type:"GET_DIAGNOSES",
    payload:list
  };
};
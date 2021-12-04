import React, { useEffect, useState } from "react";
import { useInspectValue } from "./inpsectState";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { Diagnosis, HealthCheckRating, Patient } from "../types";
import { useStateValue } from "../state";
import axios from "axios";
import { Entry } from "../types";
import AddEntryForm from "../AddPatientEntry/AddEntryForm";
import { Button } from "semantic-ui-react";

const Entries = ({entries, diagnoses}:{entries:Entry[] | undefined, diagnoses:Diagnosis[] | null}) => {
  return (
    <div>
      <h3>Entries:</h3>

      {entries?.map(entry => {

        const specialEntry:entryDetailsType= {
          date: entry.date,
          description: entry.description,
          id: entry.id,
          type:entry.type,
          diagnosisCodes:null,
        };

        switch(entry.type)
        {
          case "HealthCheck":
            specialEntry.rating = entry.healthCheckRating;
        }

        entry.diagnosisCodes?.forEach(diagnosis => {
          specialEntry.diagnosisCodes?.push({code:diagnosis, name:diagnoses?.find(d => d.code === diagnosis)?.name});
        });
        
        return <EntryDetails entry={specialEntry} key={entry.id}/>;

      })
      }
    </div>
  );
};

interface entryDetailsType {
  date: string;
  description: string | null;
  id: string;
  type:"HealthCheck" | "OccupationalHealthcare" | "Hospital";
  diagnosisCodes?: [{code: string, name:string | undefined}] | null,
  rating?: HealthCheckRating | undefined;
}

const EntryDetails = ({entry}:{entry:entryDetailsType}) => {
  let icon = null;
  let health = null;

  switch(entry.type) {
    case "HealthCheck":
      icon = <i className="icon clipboard check"></i>;
      break;
    case "OccupationalHealthcare":
      icon = <i className="icon truck"></i>;
      break;
    case "Hospital":
      icon = <i className="icon doctor"></i>;
      break;
  }

  switch(entry.rating) {
    case 0:
      health = <i className="icon heart" style={{color:'green'}}></i>;
      break;
    case 1:
      health = <i className="icon heart" style={{color:'lightgreen'}}></i>;
    break;
    
    case 2:
      health = <i className="icon heart" style={{color:'red'}}></i>;
    break;
    
    case 3:
      health = <i className="icon heart" style={{color:'brown'}}></i>;
    break;
  }

  return(
    <div style={{border:'1px solid #bbb', padding:'16px', marginBottom:'16px'}}>
      <h3>{entry.date} {icon}</h3>
      <i>{entry.description}</i>
      <br />
      {health}
    </div>
  );
};

const InspectPatient = () => {

  const [{diagnoses}] = useStateValue();

  const [{ patient }, dispatchInspect] = useInspectValue();
  const { id } = useParams<{ id: string }>();
  const [newEntry, setNewEntry] = useState(false);

  const GetPatient = async () => {
    const { data: newPatient } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );

    console.log(`Updated patient ${newPatient.name}`);
    dispatchInspect({type:"SET_PATIENT", payload:newPatient});
  };

  useEffect(()=> {

    if(patient === null ||patient.id !== id) {
      void GetPatient();
    }
  }, [dispatchInspect]);

  const closeNewEntry = () => {
    void GetPatient();
    setNewEntry(false);
  };

  const PatientInfo = () => {

  return (
    <div>
      <h1>{patient?.name}
      
      {
        patient?.gender === "male"
        ? <i className="mars icon"></i>
        : patient?.gender === "female"
        ? <i className="venus icon"></i>
        : <i className="genderless icon"></i>
      }
      
      </h1>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      {
        newEntry === false
        ? <Button onClick={()=>setNewEntry(!newEntry)}>Add entry</Button>
        : <Button onClick={()=>setNewEntry(!newEntry)}>Cancel</Button>
      }
      <br /> <br />
      {
        newEntry === false
        ? <Entries entries={patient?.entries} diagnoses={diagnoses} />
        : <AddEntryForm closeNewEntry={closeNewEntry} />
      }
      
    </div>
  );
};


  return(
    <div>
      
      {
        patient !== undefined
        ? <PatientInfo />
        : null
      }
      </div>
  );
};

export default InspectPatient;
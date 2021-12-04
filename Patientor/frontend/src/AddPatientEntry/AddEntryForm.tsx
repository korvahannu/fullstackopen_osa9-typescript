import React, { useState } from "react";
import { FormHospital } from "./FormHospital";
import { FormHealthCheck } from "./FormHealthCheck";
import { FormOccupational } from "./FormOccupational";
import { EntryFormValues } from "./Utils";
import { useInspectValue } from "../PatientListPage/inpsectState";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Entry } from "../types";
import { refresh, useStateValue } from "../state";

const checkDefaultValues = (values:EntryFormValues):string | null => {
  if(!values.type)
    return "Invalid entry type";
  if(!values.date || !Date.parse(values.date))
    return "Invalid entry date";
  if(!values.description)
    return "Invalid entry description";
  if(!values.specialist)
    return "Invalid entry specialist";
  switch(values.type) {
    case "Hospital":
      if(!values.discharge?.criteria || !values.discharge?.date || !Date.parse(values.discharge?.date))
      return "Invalid discharge criteria or time";
      break;
    case "HealthCheck":
      if(!values.healthCheckRating)
      return "Invalid rating value";
        break;
    case "OccupationalHealthcare":
      if(!values.employerName)
      return "Invalid employername";
      if(values.sickLeave?.startDate) 
        if(!Date.parse(values.sickLeave.startDate))
        return "Invalid sickleave start date format";
      if(values.sickLeave?.endDate) 
        if(!Date.parse(values.sickLeave.endDate))
        return "Invalid sickleave end date format";
      break;
    default:
      return "Unknown entry type";
    }
  return null;
};

interface AddEntryFormProps {
  closeNewEntry: ()=>void;
}

const AddEntryForm = ({closeNewEntry}:AddEntryFormProps) => {

  const [{patient}, dispatchInspect] = useInspectValue();
  const [,dispatch] = useStateValue();

  const [formType, setFormType] = useState("Hospital");

  const onSubmit = (values: EntryFormValues) => {

    const error : string  | null = checkDefaultValues(values);

    if(error !== null)
      return window.alert(error);

    console.log(patient?.id);
    console.log(values);

    void addEntry(values);
  };

  const addEntry = async (values: EntryFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      await axios.post<Entry>(`${apiBaseUrl}/patients/${patient?.id}/entries`, values);
      dispatch(refresh());
      dispatchInspect({type:'REFRESH'});
      closeNewEntry();
    }
    catch (e) {
      console.log('Unknown error has happened');
    }
  };

  const onTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => setFormType(event.target.value.replace(/ /g, ''));

  console.log(formType);
  switch(formType) {
    case "Hospital":
      return <FormHospital onSubmit={onSubmit} onTypeChange={onTypeChange} />;
    
    case "HealthCheck":
      return <FormHealthCheck onSubmit={onSubmit} onTypeChange={onTypeChange} />;

    case "OccupationalHealthcare":
      return <FormOccupational onSubmit={onSubmit} onTypeChange={onTypeChange} />;

    default:
      return null;
  }
};

export default AddEntryForm;
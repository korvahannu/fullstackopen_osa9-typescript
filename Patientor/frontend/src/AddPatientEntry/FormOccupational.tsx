import React from "react";
import { Formik, Field } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Form, Button } from "semantic-ui-react";
import { SelectType } from "./TypeOptions";
import { EntryFormValues } from "./Utils";

interface FormOccupationalProps {
  onSubmit: (values:EntryFormValues) => void;
  onTypeChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormOccupational = ({onSubmit, onTypeChange}:FormOccupationalProps) => {

  const [{diagnoses}] = useStateValue();

  return (
    <Formik
      initialValues={{
        type:"OccupationalHealthcare",
        description:"",
        specialist:"",
        date:"",
        employerName:"",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}

      onSubmit={onSubmit}

      validate={values => {
          const errors: { [field: string]: string } = {};
          const requiredError = "Field is required";
          if (!values.type) 
            errors.name = requiredError;
          if(!values.description)
            errors.name = requiredError;
          if(!values.specialist)
            errors.name = requiredError;
          if(!values.date)
            errors.name = requiredError;
          if(!values.employerName)
            errors.name = requiredError;
          return errors;
        
      }}
    >


        {({submitForm, dirty, isValid, setFieldValue, setFieldTouched}) => {
          return (
            <Form className="form ui">
              <SelectType
                label="Type"
                name="type"
                onChange={onTypeChange}
                defaultValue="Occupational Healthcare"
              />
              <Field
                label="Date of Entry"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
              label="Description"
              name="description"
              component={TextField}
              />
                <Field
              label="Specialist"
              name="specialist"
              component={TextField}
              />
              <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
              />

              <hr />

              <Field
              label="Employer name"
              name="employerName"
              component={TextField}
              />

              <Field
                label="Start date of sick leave (optional)"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />

              <Field
                label="End date of sick leave (optional)"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />

              <Button
                type="button"
                onClick={submitForm}
                floated="left"
                color="green"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
              
            </Form>
          );
        }}

      </Formik>
     );
    };
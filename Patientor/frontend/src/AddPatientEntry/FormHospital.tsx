import React from "react";
import { Formik, Field } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Form, Button } from "semantic-ui-react";
import { SelectType } from "./TypeOptions";
import { EntryFormValues } from "./Utils";

interface FormHospitalProps {
  onSubmit: (values:EntryFormValues) => void;
  onTypeChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormHospital = ({onSubmit, onTypeChange}:FormHospitalProps) => {

  const [{diagnoses}] = useStateValue();

  return (
    <Formik
      initialValues={{
        type:"Hospital",
        description:"",
        specialist:"",
        date:"",
        discharge:{
          date: "",
          criteria: ""
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
          if(!values.discharge?.criteria)
            errors.name = requiredError;
          if(!values.discharge?.date)
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
                defaultValue="Hospital"
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
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />

              <Field
                label="Criteria"
                name="discharge.criteria"
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
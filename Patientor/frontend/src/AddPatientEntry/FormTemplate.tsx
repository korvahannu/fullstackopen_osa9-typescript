import React from "react";
import { Formik, Field } from "formik";
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Form, Button } from "semantic-ui-react";
import { SelectType } from "./TypeOptions";
import { EntryFormValues } from "./Utils";

interface FormTemplateProps {
  onSubmit: (values:EntryFormValues) => void;
  onTypeChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormTemplate = ({onSubmit, onTypeChange}:FormTemplateProps) => {

  const [{diagnoses}] = useStateValue();

  return (
    <Formik
      initialValues={{
        type:"OccupationalHealthcare",
        healthCheckRating:0,
        description:"",
        specialist:"",
        date:""
      }}

      onSubmit={onSubmit}

      validate={values => {
          const errors: { [field: string]: string } = {};
          const requiredError = "Field is required";
          if (!values.type) {
            errors.name = requiredError;
          if(!values.healthCheckRating)
            errors.name = requiredError;
          if(!values.description)
            errors.name = requiredError;
          if(!values.specialist)
            errors.name = requiredError;
          if(!values.date)
            errors.name = requiredError;
          return errors;
        }
      }}
    >

        {({submitForm, dirty, isValid, setFieldValue, setFieldTouched}) => {
          return (
            <Form className="form ui">
              Hello world!
              <SelectType
                label="Type"
                name="type"
                defaultValue="OccupationalHealthcare"
                onChange={onTypeChange}
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
              <Field
              label="Health rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
              />
              <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
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
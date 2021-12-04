import React from "react";
import { Formik, Field } from "formik";
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Form, Button } from "semantic-ui-react";
import { SelectType } from "./TypeOptions";
import { EntryFormValues } from "./Utils";

interface FormHealthCheckProps {
  onSubmit: (values:EntryFormValues) => void;
  onTypeChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormHealthCheck = ({onSubmit, onTypeChange}:FormHealthCheckProps) => {

  const [{diagnoses}] = useStateValue();

  return (
    <Formik
      initialValues={{
        type:"HealthCheck",
        healthCheckRating:0,
        description:"",
        specialist:"",
        date:""
      }}

      onSubmit={onSubmit}

      validate={values => {
          const errors: { [field: string]: string } = {};
          const requiredError = "Field is required";
          if (!values.type)
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
      }}
    >


        {({submitForm, dirty, isValid, setFieldValue, setFieldTouched}) => {
          return (
            <Form className="form ui">
              <SelectType
                label="Type"
                name="type"
                onChange={onTypeChange}
                defaultValue="Health Check"
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
              label="Health rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
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
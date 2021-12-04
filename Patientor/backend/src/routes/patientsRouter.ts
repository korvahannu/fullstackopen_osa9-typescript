import express from 'express';
import patientsService from '../services/patientsService';
import convertToNewPatient from '../utils';
import { parseEntry } from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientsService.getAllPatients());
});

router.post('/', (request, response) => {


  try {
    const addedPatient = patientsService.addPatient(convertToNewPatient(request.body));
    response.send(addedPatient);
  }
  catch(error) {
    let errorMessage = 'Error: ';

    if(error instanceof Error)
      errorMessage += error.message;
    
    response.status(404).send(errorMessage);
  }

});

router.post('/:patientId/entries', (request, response) => {
  const patientId = request.params.patientId.toString();
  const entry = request.body;

  // TODO: validate entry type: all required fields must be filled
  patientsService.addEntryToPatient(patientId, parseEntry(entry));

  response.send(request.params.patientId);
});

router.get('/:id', (request, response) => {
  response.send(patientsService.findPatientWithId(request.params.id.toString()));
});

export default router;
import express from 'express';
import diagnosesServices from '../services/diagnosesServices';
const router = express.Router();

router.get('/', (_request, response) => {
  response.send(diagnosesServices.getAllDiagnoses());
});

export default router;
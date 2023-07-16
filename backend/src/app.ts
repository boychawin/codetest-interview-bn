import express from 'express';
import { HomeController } from './controllers/HomeController';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors({ origin: '*' }));
app.use(express.json());

const homeController = new HomeController();

app.get('/home', homeController.getHomes);
app.post('/home', homeController.createHome);
app.patch('/home/:id', homeController.updateHome);
app.delete('/home/:id', homeController.deleteHome);
app.get('/postCode', homeController.getPostCode);
app.get('/postCode/:postCodeValue', homeController.getPostCodeDetail);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from 'express';
import { HomeController } from './controllers/HomeController';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: '*' })); 
app.use(express.json());

const homeController = new HomeController();
/* 
1.The frontend will call the "get" method to "/home" with 2 queries.
■ skip=0
■ take=5
2.An expected result is payload array of homelist within the skip and take with the
count

*/
app.get('/home', homeController.getHomes);
/*
The frontend will call the "post" method to "/home" with the payload below.
■ { "name": "house name", "desc": "house description", "price": "100.05",
"post_code": "10200"}
*/
app.post('/home', homeController.createHome);
/* 
Edit
*/
app.patch('/home/:id', homeController.updateHome);
/* 
Delete
*/
app.delete('/home/:id', homeController.deleteHome);
/* 
It is a dropdown to select the postcode.
1. This component will call the "get" method to "/postCode".
2. An expected result is the payload array of postcode with the count
*/
app.get('/postCode', homeController.getPostCode);
/* 
Display average and median each postcode
1. After selecting the postcode this component will trigger the “get” method to
“/postCode/:id”
2. An expected result is the price average and median of all houses in this postcode
*/
app.get('/postCode/:postCodeValue', homeController.getPostCodeDetail);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

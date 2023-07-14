import express, { Request, Response } from 'express';
// import Routes from './routes/routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});
 
// app.use('/home', exampleRoutes);
app.get('/home', (req: Request, res: Response) => {
    const { skip, take } = req.query;
    // Logic to handle GET request with query parameters
    // Use the values of 'skip' and 'take' as needed
    res.send('GET: /home');
  });
  
  app.post('/home', (req: Request, res: Response) => {
    // Logic to handle POST request
    res.send('POST: /home');
  });
  
  app.patch('/home/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    // Logic to handle PATCH request with path parameter 'id'
    res.send(`PATCH: /home/${id}`);
  });
  
  app.delete('/home/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    // Logic to handle DELETE request with path parameter 'id'
    res.send(`DELETE: /home/${id}`);
  });
  
  app.get('/postCode', (req: Request, res: Response) => {
    // Logic to handle GET request for '/postCode'
    res.send('GET: /postCode');
  });
  
  app.get('/postCode/:postCodeValue', (req: Request, res: Response) => {
    const { postCodeValue } = req.params;
    // Logic to handle GET request with path parameter 'postCodeValue'
    res.send(`GET: /postCode/${postCodeValue}`);
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
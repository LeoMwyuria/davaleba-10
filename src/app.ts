import express, { Express, Response, Request } from 'express';
import { readData, writeData, Expense } from './utils';

const app: Express = express();

app.use(express.json());

app.get('/api', async (req: Request, res: Response) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error reading data');
  }
});


app.get('/api/:id', async (req: Request, res: Response) => {
  try {
    const data = await readData();
    const expense = data.find(e => e.id === parseInt(req.params.id, 10));
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).send('Expense not found');
    }
  } catch (error) {
    res.status(500).send('Error reading data');
  }
});


app.post('/api', async (req: Request, res: Response) => {
  try {
    const data = await readData();
    const newExpense: Expense = {
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
      name: req.body.name,
      cost: req.body.cost,
      createdAt: new Date().toLocaleDateString(), 
    };
    data.push(newExpense);
    await writeData(data);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).send('Error writing data');
  }
});


app.put('/api/:id', async (req: Request, res: Response) => {
  try {
    const data = await readData();
    const index = data.findIndex(e => e.id === parseInt(req.params.id, 10));
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      await writeData(data);
      res.json(data[index]);
    } else {
      res.status(404).send('Expense not found');
    }
  } catch (error) {
    res.status(500).send('Error writing data');
  }
});


app.delete('/api/:id', async (req: Request, res: Response) => {
  try {
    const data = await readData();
    const newData = data.filter(e => e.id !== parseInt(req.params.id, 10));
    if (newData.length !== data.length) {
      await writeData(newData);
      res.status(204).send();
    } else {
      res.status(404).send('Expense not found');
    }
  } catch (error) {
    res.status(500).send('Error writing data');
  }
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

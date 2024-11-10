import cors from 'cors';
import express from 'express';
import { buildContract, publishContract } from './build';

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: '10mb' }));

app.get('/', (_req, res) => {
  res.send('Suistack backend is running!');
});

app.post('/build', async (req, res) => {
  const project = req.body;

  try {
    // Call compile function
    const compileResult = await buildContract();

    console.log('compileResult', compileResult)

    res.send(compileResult);
  } catch (error: any) {
    console.log('error', error)

    res.errored
  }
});


app.post('/publish', async (req, res) => {
  try {
    // Call compile function
    const compileResult = await publishContract();

    console.log('publishSuccess', compileResult)

    res.send(compileResult);
  } catch (error: any) {
    console.log('error', error)

    res.errored
  }
});

app.listen(3000, () => {
  console.log(`REST API is listening on port: ${3000}.`);
});
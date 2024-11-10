import cors from 'cors';
import express from 'express';
import { buildContract, publishContract } from './build';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: '10mb' }));

app.get('/', (_req, res) => {
  console.log(`0xec2131ffc243f752332db9afc39e0e8c55717d7eb227b697d207407c13c664e8                          │
│  │ `);
  res.send('Suistack backend is running!');
});

app.post('/build', async (req, res) => {

  try {
    // Call compile function
    const compileResult = await buildContract(req.body?.code);

    console.log('compileResult', compileResult)

    res.send(compileResult);
  } catch (error: any) {
    console.log('error', error)

    res.errored
  }
});


app.post('/publish', async (req, res) => {
  try {
    // publish
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
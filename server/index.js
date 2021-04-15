import express, { json } from 'express';
import uid from 'uid';
const app = express();
const port = 3000;

const objs = {};

// express configuration
app.use(json({ type: '*/*' }));

// Set your routes
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => {
  res.send(`Received object. ${JSON.stringify(req.body)}`);
});

app.post('/share', (req, res) => {
  const id = uid(16);
  console.log(id);
  objs[id] = req.body;
  //    console.log(`This is body: ${req.body}`);
  res.send({ success: true, link: `http://localhost:3000/${id}` });
});

app.get('/:id', (req, res) => {
  if (req.params.id && objs[req.params.id]) {
    const data = objs[req.params.id];
    delete objs[req.params.id];
    res.send(data);
  } else {
    res.status(404).send({ success: false, error: 404, message: 'Not Found!' });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

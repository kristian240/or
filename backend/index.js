require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const client = new Client();

const app = express();

app.use(cors());

app.get('/data', async (req, res) => {
  const data = await client.query(
    `select *
    from zastupnik
      join zastupnik_komisija on zastupnik_komisija.zastupnik_id = zastupnik.id
      join komisija on zastupnik_komisija.komisija_id = komisija.id
    order by zastupnik.id, komisija.naziv`
  );

  res.json({ data: data.rows });
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await client.connect();

  console.log(`Example app listening at http://localhost:${port}`);
});

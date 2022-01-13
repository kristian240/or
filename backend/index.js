require('dotenv').config();

const express = require('express');
const cors = require('cors');

const db = require('./utils/db');

const v2Router = require('./routes/v2.router');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/data', async (req, res) => {
  const data = await db.query(
    `select *
    from zastupnik
      join zastupnik_komisija on zastupnik_komisija.zastupnik_id = zastupnik.id
      join komisija on zastupnik_komisija.komisija_id = komisija.id
    order by zastupnik.id, komisija.naziv`
  );

  res.json({ data: data.rows });
});

app.use('/v2', v2Router);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await db.connect();

  console.log(`Example app listening at http://localhost:${port}`);
});

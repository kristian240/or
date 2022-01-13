var express = require('express');
var router = express.Router();
const db = require('../utils/db');

router.get('/', async (req, res) => {
  const data = await db.query(
    `select *
    from komisija
    order by komisija.id
    `
  );

  res.json({ status: 'OK', message: 'Popis komisija', response: data.rows });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id)))
    return res
      .status(400)
      .json({ status: 'Bad Request', message: 'ID mora biti broj', response: null });

  const data = await db.query(
    `select *
    from komisija
    where komisija.id = $1
    `,
    [id]
  );

  if (!data.rowCount)
    return res
      .status(404)
      .json({ status: 'Not Found', message: 'Komisija ne postoji', response: null });

  res.json({ status: 'OK', message: 'Komisija', response: data.rows[0] });
});

module.exports = router;

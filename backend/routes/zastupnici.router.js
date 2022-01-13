var express = require('express');
var router = express.Router();
const db = require('../utils/db');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  const data = await db.query(
    `select zastupnik.*, array_agg(distinct komisija.id) as komisija_id
    from zastupnik
      left join zastupnik_komisija on zastupnik_komisija.zastupnik_id = zastupnik.id
      left join komisija on zastupnik_komisija.komisija_id = komisija.id
    group by zastupnik.id
    order by zastupnik.id
    `
  );

  res.json({ status: 'OK', message: 'Popis zastupnika', response: data.rows });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id)))
    return res
      .status(400)
      .json({ status: 'Bad Request', message: 'ID mora biti broj', response: null });

  const data = await db.query(
    `select zastupnik.*, array_agg(distinct komisija.id) as komisija_id
    from zastupnik
      left join zastupnik_komisija on zastupnik_komisija.zastupnik_id = zastupnik.id
      left join komisija on zastupnik_komisija.komisija_id = komisija.id
    where zastupnik.id = $1 
    group by zastupnik.id
    order by zastupnik.id
    `,
    [id]
  );

  if (!data.rowCount)
    return res
      .status(404)
      .json({ status: 'Not Found', message: 'Zastupnik ne postoji', response: null });

  return res.json({ status: 'OK', message: 'Zastupnik', response: data.rows[0] });
});

router.get('/:id/komisije', async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id)))
    return res
      .status(400)
      .json({ status: 'Bad Request', message: 'ID mora biti broj', response: null });

  const data = await db.query(
    `select komisija.*
    from zastupnik_komisija
      left join komisija on zastupnik_komisija.komisija_id = komisija.id
    where zastupnik_komisija.zastupnik_id = $1 
    order by komisija.id
    `,
    [id]
  );

  return res.json({ status: 'OK', message: 'Zastupnikove komisije', response: data.rows });
});

router.get('/:zastupnikId/komisije/:komisijaId', async (req, res) => {
  const { komisijaId, zastupnikId } = req.params;

  if (Number.isNaN(Number(komisijaId)) || Number.isNaN(Number(zastupnikId)))
    return res
      .status(400)
      .json({ status: 'Bad Request', message: 'ID mora biti broj', response: null });

  const data = await db.query(
    `select komisija.*
    from zastupnik_komisija
      left join komisija on zastupnik_komisija.komisija_id = komisija.id
    where komisija.id = $1 and zastupnik_komisija.zastupnik_id = $2 
    order by komisija.id
    `,
    [komisijaId, zastupnikId]
  );

  if (!data.rowCount)
    return res
      .status(404)
      .json({ status: 'Not Found', message: 'Zastupnik ne postoji', response: null });

  return res.json({ status: 'OK', message: 'Zastupnikove komisije', response: data.rows[0] });
});

router.post(
  '/',
  body('ime').isString().withMessage('Ime je obavezno'),
  body('prezime').isString().withMessage('Prezime je obavezno'),
  body('klub').isString().withMessage('Klub je obavezan'),
  body('majka').optional().isString(),
  body('otac').optional().isString(),
  body('mjesto_rodjenja').optional().isString(),
  body('nacionalni_klub').isString().withMessage('Nacionalni klub je obavezan'),
  body('razina_obrazovanja').isString().withMessage('Razina obrazovanja je obavezna'),
  body('datum_rodjenja').isDate().withMessage('Razina obrazovanja je obavezna'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 'Bad Request', message: 'Podatci nisu validni', response: errors.array() });
    }

    const data = await db.query(
      `insert into zastupnik
        (ime, prezime, klub, otac, majka, mjesto_rodjenja, nacionalni_klub, razina_obrazovanja, datum_rodjenja)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        req.body.ime || null,
        req.body.prezime || null,
        req.body.klub || null,
        req.body.otac || null,
        req.body.majka || null,
        req.body.mjesto_rodjenja || null,
        req.body.nacionalni_klub || null,
        req.body.razina_obrazovanja || null,
        req.body.datum_rodjenja || null,
      ]
    );

    return res
      .status(201)
      .json({ status: 'Created', message: 'Zastupnik kreiran', response: data.rows[0] });
  }
);

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id)))
    return res
      .status(400)
      .json({ status: 'Bad Request', message: 'ID mora biti broj', response: null });

  const data1 = await db.query(
    `select *
    from zastupnik
    where id = $1`,
    [id]
  );

  if (!data1.rowCount)
    return res
      .status(404)
      .json({ status: 'Not Found', message: 'Zastupnik ne postoji', response: null });

  const zastupnik = data1.rows[0];

  const data = await db.query(
    `update zastupnik
    set ime=$2, prezime=$3, klub=$4, otac=$5, majka=$6, mjesto_rodjenja=$7, nacionalni_klub=$8, razina_obrazovanja=$9, datum_rodjenja=$10
    where id = $1
    `,
    [
      id,
      req.body.ime ?? zastupnik.ime,
      req.body.prezime ?? zastupnik.prezime,
      req.body.klub ?? zastupnik.klub,
      req.body.otac ?? zastupnik.otac,
      req.body.majka ?? zastupnik.majka,
      req.body.mjesto_rodjenja ?? zastupnik.mjesto_rodjenja,
      req.body.nacionalni_klub ?? zastupnik.nacionalni_klub,
      req.body.razina_obrazovanja ?? zastupnik.razina_obrazovanja,
      req.body.datum_rodjenja ?? zastupnik.datum_rodjenja,
    ]
  );

  return res
    .status(201)
    .json({ status: 'Created', message: 'Zastupnik ažuriran', response: data.rows[0] });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id)))
    return res
      .status(400)
      .json({ status: 'Bad Request', message: 'ID mora biti broj', response: null });

  const data1 = await db.query(
    `select *
    from zastupnik
    where id = $1`,
    [id]
  );

  if (!data1.rowCount)
    return res
      .status(404)
      .json({ status: 'Not Found', message: 'Zastupnik ne postoji', response: null });

  await db.query(
    `delete from actor
    where id = $1`,
    [id]
  );

  return res.status(200).json({ status: 'OK', message: 'Zastupnik izbrisan', response: null });
});

module.exports = router;

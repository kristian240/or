import { NextApiHandler } from 'next';
import { Client } from 'pg';

const handler: NextApiHandler = async (req, res) => {
  const client = new Client();
  await client.connect();

  const { method } = req;
  const { accept } = req.headers;

  if (method === 'OPTIONS') {
    res.end();
    return;
  }

  if (accept.includes('text/csv')) {
    console.log('Generating CSV');

    const data = await client.query(
      'select zastupnik.*, komisija.naziv, komisija.akronim, zastupnik_komisija.uloga from zastupnik join zastupnik_komisija on zastupnik_komisija.zastupnik_id = zastupnik.id join komisija on zastupnik_komisija.komisija_id = komisija.id order by zastupnik.id, komisija.naziv'
    );

    const csvHeader = Object.keys(data.rows[0]);
    const csvData = data.rows
      .reduce(
        (a, c) => [
          ...a,
          Object.values(c)
            .map((v) => `"${v}"`)
            .join(),
        ],
        []
      )
      .join('\n');

    return res.setHeader('content-type', 'text/csv').send(csvHeader + '\n' + csvData);
  } else if (accept.includes('application/json')) {
    console.log('Generating JSON');

    const data = await client.query(
      "SELECT json_agg(to_json(zastupnici)) FROM (SELECT zastupnik.*, tmp.\"komisije\" FROM zastupnik JOIN (SELECT zastupnik_komisija.zastupnik_id AS tmpId, json_agg(json_build_object('id', komisija.id,'naziv', komisija.naziv,'akronim', komisija.akronim, 'uloga', zastupnik_komisija.uloga)) AS \"komisije\" FROM komisija JOIN zastupnik_komisija ON zastupnik_komisija.komisija_id = komisija.id GROUP BY 1) tmp on tmpId = zastupnik.id) zastupnici"
    );

    return res.setHeader('content-type', 'application/json').send(data.rows[0].json_agg);
  }

  res.status(400).end();
};

export default handler;

var express = require('express');
var router = express.Router();

const zastupniciRouter = require('./zastupnici.router');
const komisijeRouter = require('./komisije.router');

router.use('/zastupnici', zastupniciRouter);
router.use('/komisije', komisijeRouter);

router.use((req, res) => {
  res.status(404).json({
    status: 'Not Found',
    message: 'Route not found',
    response: null,
  });
});

router.use((err, req, res) => {
  console.error('500', err.stack);
  res.status(500).json({
    status: 'Internal Server Error',
    message: 'Something went wrong.',
    response: null,
  });
});

module.exports = router;

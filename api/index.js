const express = require('express');
const promMid = require('express-prometheus-middleware');

const PORT = process.env.PORT || 3001;
const createApp = () => {
  const app = express();

  const verifyAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || authHeader !== 'mysecrettoken') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };

  app.use('/metrics', verifyAuthorization);

  app.use(
    promMid({
      metricsPath: '/metrics',
      collectDefaultMetrics: true,
    })
  );

  app.use(verifyAuthorization);

  app.get('/time', (req, res) => {
    res.json({ epoch: Math.floor(Date.now() / 1000) });
  });

  return app;
};

if (require.main === module) {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

module.exports = createApp;

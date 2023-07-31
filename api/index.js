const express = require('express');
const promMid = require('express-prometheus-middleware');

const PORT = process.env.PORT || 3001;

const createApp = () => {
  const app = express();

  const verifyAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'mysecrettoken') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };

  const metricsMiddleware = promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
  });

  const timeRouteHandler = (req, res) => {
    res.json({ epoch: Math.floor(Date.now() / 1000) });
  };

  const timeMiddleware = (req, res, next) => {
    verifyAuthorization(req, res, next);
  };

  app.use(verifyAuthorization);

  app.get('/time', timeMiddleware, timeRouteHandler);
  app.use('/metrics', metricsMiddleware);

  return app;
};

if (require.main === module) {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

module.exports = createApp;

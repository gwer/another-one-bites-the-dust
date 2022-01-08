const express = require('express');
const path = require('path');

const { statusData, startDataPolling } = require('./data_manager');

function server(checkConfig) {
  startDataPolling(checkConfig);

  const app = express();
  const port = process.env.PORT || 3000;

  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'hbs');
  app.use(express.static(path.join(__dirname, './public')));

  app.get('/', (req, res) => {
    if (!statusData.updateTime) {
      return res.render('page', { title: 'Waiting for a data' });
    }

    if (statusData.checkData.length === 0) {
      return res.render('page', {
        title: 'There is no valid groups in config',
      });
    }

    res.render('index', {
      ...statusData,
      title: checkConfig.title || 'Another One Bites the Dust',
      groupsMod: checkConfig.showExpanded ? '' : 'hidden',
    });
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });

  return app;
}

module.exports = server;

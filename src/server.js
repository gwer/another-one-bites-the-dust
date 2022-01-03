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

  app.get('/group/:group', (req, res) => {
    const { group } = req.params;

    return renderGroupStatus(group, res);
  });

  app.get('/', (req, res) => {
    if (!statusData.updateTime) {
      return res.render('page', { title: 'Waiting for a data' });
    }

    if (statusData.checkData.length === 0) {
      return res.render('page', {
        title: 'There is no valid groups in config',
      });
    }

    if (statusData.checkData.length === 1) {
      return renderGroupStatus(statusData.checkData[0].group, res);
    }

    res.render('index', statusData);
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });

  function renderGroupStatus(group, res) {
    if (!statusData.updateTime) {
      return res.render('page', { title: 'Waiting for a data' });
    }

    const checkData = statusData.checkData.find((item) => item.group === group);

    if (!checkData) {
      return res.status(404).render('page', { title: 'Not Found' });
    }

    return res.render('status', {
      ...checkData,
      updateTime: statusData.updateTime,
    });
  }

  return app;
}

module.exports = server;

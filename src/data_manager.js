const checkAll = require('./check_all');

const statusData = {
  checkData: null,
  updateTime: null,
};

async function updateStatusData(checkConfig) {
  const checkData = await checkAll(checkConfig);
  const updateTime = new Date();

  statusData.checkData = checkData;
  statusData.updateTime = updateTime;
}

function startDataPolling(checkConfig) {
  updateStatusData(checkConfig);

  const pollingTimerId = setInterval(
    () => updateStatusData(checkConfig),
    checkConfig.pollingCycle * 1000
  );
}

module.exports.statusData = statusData;
module.exports.startDataPolling = startDataPolling;

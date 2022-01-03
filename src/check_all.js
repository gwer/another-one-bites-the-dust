async function checkAll(checkConfig) {
  const services = flatServices(checkConfig.groups);

  return prepareStatusData(
    await Promise.all(services.map(checkService)),
    checkConfig.groups.map((g) => g.name)
  );
}

function flatServices(groups) {
  return groups
    .map((group) =>
      group.checks.map(({ name, checker, options }) => ({
        name,
        checker,
        options,
        group: group.name,
      }))
    )
    .flat();
}

async function checkService(serviceConfig) {
  const { name, checker, options, group } = serviceConfig;
  const result = await checker(options);

  return { name, group, result };
}

function prepareStatusData(rawData, groups) {
  const statusPriority = {
    ok: 0,
    warning: 1,
    error: 2,
  };

  const grouppedData = {};

  rawData.forEach((serviceCheckResult) => {
    const { name, group, result } = serviceCheckResult;
    if (!(group in grouppedData)) {
      grouppedData[group] = {
        group,
        status: 'ok',
        services: [],
      };
    }

    grouppedData[group].services.push({ name, ...result });

    if (
      statusPriority[result.status] > statusPriority[grouppedData[group].status]
    ) {
      grouppedData[group].status = result.status;
    }
  });

  const checkData = groups
    .map((group) => (group in grouppedData ? grouppedData[group] : null))
    .filter(Boolean);

  return checkData;
}

module.exports = checkAll;

import config from './config';
const resource = `http://aqa.unloquer.org:8086/query?db=aqa&epoch=s&q=`;

const constructQuery = () => {
  const measurements = config.devices.map((device) => {
    let queryMeasurements = config.measurements.map((measurement, i, arr) => arr.length === i + 1 ? `SUM("${measurement}")`: `SUM("${measurement}") + `)
    return encodeURIComponent(
      `SELECT "result" FROM (SELECT ${queryMeasurements.join('')} AS "result" FROM ${config.database}.${`"${device}"`} WHERE time > now() - 24h GROUP BY time(30m));`)
  });
  const locations = config.devices.map((device) => 
    encodeURIComponent(`SELECT mean("lat") AS "lat", mean("lng") AS "lng" FROM ${config.database}.${`"${device}"`} WHERE time > now() - 1h;`)
  )
  return `${resource}${measurements.join('')}${locations.join('')}`;
}

export default constructQuery;






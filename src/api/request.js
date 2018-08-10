import config from './config';
const resource = `http://aqa.unloquer.org:8086/query?db=aqa&epoch=s&q=`;

/*
  Function that requests data from all devices.
  First we need to generate all subqueries that follow a format such as mean('25') for every device using the config
  Then, we need to concatenate every query using semicolons as separators.
  Every query needs to be encoded so the request doesn't fail because of special characters such as ';'
  Finally, we define a time for every query using InfluxDB's query language
*/
const constructQuery = (difference='1m') => {
  const subqueries = Object.values(config.devices).map((device) => {
    let variables = device.measurements.map(((measure, i, arr) => `mean("${measure}")`));
    return encodeURIComponent(`SELECT ${variables} FROM ${config.database}.${`"${device.device}"`} WHERE time > now() - ${difference};`);
  });
  return `${resource}${subqueries.join('')}`;
}
    
export default constructQuery;






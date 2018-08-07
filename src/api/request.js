import config from './config';
const resource = `http://aqa.unloquer.org:8086/query?db=aqa&q=`;

  const createSubqueries = () => {
    const subqueries = Object.values(config.devices).map((device) => {
      let variables = device.measurements.map(((measure, i, arr) => `mean("${measure}")`));
      return encodeURIComponent(`SELECT ${variables} FROM ${config.database}.${`"${device.device}"`};`);
    });
    return `${resource}${subqueries.join('')}`;
  }
    
export default createSubqueries;




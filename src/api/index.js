import { apiConfig } from '../config.js'
import { INFLUXDB_TIMEFRAME_VALUE, INFLUXDB_GROUPBY_VALUE } from '../constants.js';


const fetchData = async() => {
  const request = await fetch(`${apiConfig.resource}${apiConfig.query(INFLUXDB_TIMEFRAME_VALUE, INFLUXDB_GROUPBY_VALUE)}`);
  return request.ok && request.json();
}

export default fetchData;
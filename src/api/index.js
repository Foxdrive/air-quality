import isNumber from 'lodash/isNumber';
import filter from 'lodash/filter';
import moment from 'moment';


import constructQuery from './request';


class FetchData {

  parseResponse(data) {
    return data.then((result) => {
      const resultsArray = result.results;
      const measurements = resultsArray.slice(0,(resultsArray.length/2));
      let parsedData =  measurements.reduce((parsedResult, current, i) => {
        parsedResult.push({
          measurement: current.series && current.series[0].values.map(measurement => [moment.unix(measurement[0]), measurement[1]]),
          lat: resultsArray[i + (resultsArray.length/2)].series && resultsArray[i + (resultsArray.length/2)].series[0].values[0][1],
          lng: resultsArray[i + (resultsArray.length/2)].series && resultsArray[i + (resultsArray.length/2)].series[0].values[0][2],
          name: resultsArray[i + (resultsArray.length/2)].series && resultsArray[i + (resultsArray.length/2)].series[0].name
        });
        return parsedResult;
      }, [])
      return filter(parsedData, (device) => isNumber(device.lat) && isNumber(device.lng));
    });
  }

  async requestData() {
    const response = await fetch(constructQuery())
    const data = await response.ok && this.parseResponse(response.json());
    return data;
  }
}


export default FetchData;


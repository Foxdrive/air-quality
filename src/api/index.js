import constructQuery from './request';

class FetchData {

  parseResponse(data) {
    return data.then((result) => {
      const resultsArray = result.results;
      const measurements = resultsArray.slice(0,(resultsArray.length/2));
      return measurements.reduce((parsedResult, current, i) => {
        parsedResult.push({
          measurement: current.series && current.series[0].values,
          lat: resultsArray[i + (measurements.length/2)].series && resultsArray[i + (measurements.length/2)].series[0].values[1],
          lng: resultsArray[i + (measurements.length/2)].series && resultsArray[i + (measurements.length/2)].series[0].values[2]
        });
        return parsedResult;
      }, [])
    });
  }

  async requestData() {
    const response = await fetch(constructQuery())
    const data = await response.ok && this.parseResponse(response.json());
    return data;
  }
}


export default FetchData;


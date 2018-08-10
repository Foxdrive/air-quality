import constructQuery from './request';

class FetchData {

  constructor(timeDifference) {
    this.timeDifference = timeDifference;
  }

  async requestData() {
    let response = await fetch(constructQuery(this.timeDifference))
    let data = await response.ok && response.json();
    return data;
  }
}


export default FetchData;
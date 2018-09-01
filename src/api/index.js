const fetchData = async() => {
  const resource = `http://aqa.unloquer.org:8086/query?db=aqa&epoch=s&q=`;
  const query = encodeURIComponent(`SELECT last("lng") AS "last_lng", last("lat") AS "last_lat", last("pm10") AS "last_pm10", last("pm25") AS "last_pm25" FROM "aqa"."autogen"././ WHERE time > now() - 24h GROUP BY time(30m)`);
  const request = await fetch(`${resource}${query}`);
  return request.ok && request.json();
}

export default fetchData;
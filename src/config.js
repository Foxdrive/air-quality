const config = {
  resource: `http://aqa.unloquer.org:8086/query?db=aqa&epoch=s&q=`,
  query: 
    (timeframe, interval) => 
    encodeURIComponent(`SELECT last("lng") AS "last_lng", last("lat") AS "last_lat", last("pm10") AS "last_pm10", last("pm25") AS "last_pm25" FROM "aqa"."autogen"././ WHERE time > now() - ${timeframe} GROUP BY time(${interval})`),  
}

export default config;
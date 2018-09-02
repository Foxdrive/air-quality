export const apiConfig = {
  resource: `http://aqa.unloquer.org:8086/query?db=aqa&epoch=s&q=`,
  query: 
    (timeframe, interval) => 
    encodeURIComponent(`SELECT last("lng") AS "last_lng", last("lat") AS "last_lat", last("pm10") AS "last_pm10", last("pm25") AS "last_pm25" FROM "aqa"."autogen"././ WHERE time > now() - ${timeframe} GROUP BY time(${interval})`),
}

export const measurementsConfig = {
  colorsTable: {
      1: '#9f0',
      2: '#fc0',
      3: '#f60',
      4: '#f00',
      5: '#f06'
    },
    ranges: {
      pm25: [
        [0, 24], 
        [24, 42],
        [42, 54],
        [54, 65],
        [65, Infinity]
      ],
      pm10: [
        [0, 34], 
        [34, 59],
        [59, 76],
        [76, 92],
        [92, Infinity]
      ]
    }
};
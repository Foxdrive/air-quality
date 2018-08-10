const config = {
  resource: `http://aqa.unloquer.org:8086/query/`,
  database: `"aqa"."autogen"`,
  devices: {
    envigado: {
      device: 'valenciasanchez',
      measurements: ['pm25', 'lat', 'lng']
    },
    pradoCentro: {
      device: 'volkerC3p',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    laFrontera: {
      device: 'volker0016',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    floridaNueva: {
      device: 'florida_nueva',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    sanLucas: {
      device: 'jero98772',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    elDiamante: {
      device: 'bogota7',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    celsiaYumbo: {
      device: 'volker0011',
      measurements: ['humidity', 'pm25', 'speed', 'temperature', 'lat', 'lng']
    },
    belen: {
      device: 'volker0003',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    calazans: {
      device: 'volker0004',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    bello: {
      device: 'bello',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    manriqueOriental: {
      device: 'volker0002',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    calazans2: {
      device: 'volker0004_2',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    moravia: {
      device: 'volker0008',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
    santillana: {
      device: 'volker0012',
      measurements: ['pm1', 'pm10', 'pm25', 'lat', 'lng']
    },
  }
}

export default config;
const config = {
  resource: `http://aqa.unloquer.org:8086/query/`,
  database: `"aqa"."autogen"`,
  devices: {
    envigado: {
      device: 'valenciasanchez',
      measurements: ['pm25']
    },
    pradoCentro: {
      device: 'volkerC3p',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    laFrontera: {
      device: 'volker0016',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    floridaNueva: {
      device: 'florida_nueva',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    sanLucas: {
      device: 'jero98772',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    elDiamante: {
      device: 'bogota7',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    celsiaYumbo: {
      device: 'volker0011',
      measurements: ['humidity', 'pm25', 'speed', 'temperature']
    },
    belen: {
      device: 'volker0003',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    calazans: {
      device: 'volker0004',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    bello: {
      device: 'bello',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    manriqueOriental: {
      device: 'volker0002',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    calazans2: {
      device: 'volker0004_2',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    moravia: {
      device: 'volker0008',
      measurements: ['pm1', 'pm10', 'pm25']
    },
    santillana: {
      device: 'volker0012',
      measurements: ['pm1', 'pm10', 'pm25']
    },
  }
}

export default config;
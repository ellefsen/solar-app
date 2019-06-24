var axios = require('axios');
var Influx = require('influxdb-nodejs');

const client = new Influx('http://hoyaas:secret@influxdb:8086/hoyaas')

console.log('Running script.')

axios.get('http://api')
    .then(async response => {
      await client.write('battery')
        .field(response.data)
        .then(() => console.info('write point success'))
        .catch(console.error)
    })
    .catch(console.error)
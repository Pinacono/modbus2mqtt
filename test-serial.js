const { SerialPort } = require('serialport');

SerialPort.list()
.then( ports => {;
  console.log(ports);
});

const config = {

}
const port_out = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600, dataBits: 8, parity: 'even', stopBits: 1 });
const port_in  = new SerialPort({ path: '/dev/ttyUSB1', baudRate: 9600, dataBits: 8, parity: 'even', stopBits: 1 });

port_in.on('data', console.log);

let i = 0;
setInterval( () => {
  port_out.write("data = " + i);
  i++
}, 1000);

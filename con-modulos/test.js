import https from 'node:https';

https.get('https://restcountries.com/v3.1/name/xxx', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    console.log('data:');
    process.stdout.write(d);
  });

  res.on('end', () => {
    console.log('end:');
  });

}).on('error', (e) => {
    console.log('error:');

  console.error(e);
});
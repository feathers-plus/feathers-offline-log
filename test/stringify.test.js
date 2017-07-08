
function make (count, seed) {
  const obj = [count, seed];

  for (let i = 0; i < count; i++) {
    const unique = seed + count + i;

    obj.push({
      name: { first: 'eddyy', middle: 'boomer', last: 'stop', unique },
      address: { line1: '5 Vallet of Shadows',
        line2: 'upper floor',
        city: 'Orgrimmar',
        country: 'Kalimdor',
        planet: 'Azeroth',
        unique },
      messages: [
        'Death to the Alliance!',
        'Vanilla WoW was best! Burning Crusade was pretty good.',
        unique
      ]
    });
  }

  return obj;
}

const loops = 10;
const times = [];
let str;

for (let loop = 0; loop < loops; loop++) {
  const obj = make(20000, Math.random());
  let start = process.hrtime();

  str = JSON.stringify(obj);

  let end = process.hrtime(start);
  times.push(end[1] / 1000000);
}

const avg = times.reduce((total, curr) => total + curr, 0) / loops;
console.log('%d megs, average %d ms', str.length / 1000000, avg);
console.log(times);

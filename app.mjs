import LST from 'local-sidereal-time';

export function getLST(utc) {
  const date = utc ? new Date(parseInt(utc)) : new Date();
  const lst = LST.getLST(date, -119.7938046);

  const totalSeconds = lst*60*60;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor(totalSeconds % 3600 / 60);
  const s = Math.floor(totalSeconds % 3600 % 60);

  const hours = ((h + 11) % 12 + 1);
  const minutes = String(m).padStart(2, '0');
  const seconds = String(s).padStart(2, '0');
  const suffix = h <= 12 ? 'AM' : 'PM';

  return { LST: `${hours}:${minutes}:${seconds} ${suffix}` };
}

// import Astro from 'circular-natal-horoscope-js';
// const { Origin, Horoscope } = Astro;

// export function natalHoroscope() {
//   const origin = new Origin({
//       year: 1985,
//       month: 0,
//       date: 7,
//       hour: 15,
//       minute: 0,
//       latitude: 10.6058073,
//       longitude: 104.1767753,
//   });

//   const horoscope =  new Horoscope({
//       origin,
//       houseSystem: "whole-sign",
//       zodiac: "tropical",
//       aspectPoints: ['bodies', 'points', 'angles'],
//       aspectWithPoints: ['bodies', 'points', 'angles'],
//       aspectTypes: ["major", "minor"],
//       customOrbs: {},
//       language: 'en'
//   });

//   return getHoroscope(horoscope);
// }

// function getHoroscope(horoscope) {
//     const data = {};
  
//     data.planets = Object.assign(
//       {},
//       ...horoscope._celestialBodies.all.map((body) => {
//         const key = body.key.charAt(0).toUpperCase() + body.key.slice(1);
//         return { [key]: [body.ChartPosition.Ecliptic.DecimalDegrees] };
//       })
//     );
  
//     data.cusps = horoscope._houses.map((cusp) => {
//       return cusp.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
//     });
  
//     data.As = [horoscope._ascendant.ChartPosition.Horizon.DecimalDegrees];
//     data.Ds = [(data.As + 180) % 360];
//     data.Mc = [horoscope._midheaven.ChartPosition.Horizon.DecimalDegrees];
//     data.Ic = [(horoscope._midheaven.ChartPosition.Horizon.DecimalDegrees + 180) % 360];
  
//     data.Sun = horoscope.CelestialBodies.sun;
//     data.Moon = horoscope.CelestialBodies.moon;
//     data.Earth = { As: horoscope.Ascendant, Mc: horoscope.Angles.midheaven };
  
//     return data;
//   }
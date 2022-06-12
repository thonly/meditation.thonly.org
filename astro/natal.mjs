import { getHoroscope } from './horoscope.mjs';
const { Origin, Horoscope } = Astro;

export function natalHoroscope() {
  const origin = new Origin({
      year: localStorage.getItem('birth-year'),
      month: localStorage.getItem('birth-month'),
      date: localStorage.getItem('birth-day'),
      hour: localStorage.getItem('birth-hour'),
      minute: localStorage.getItem('birth-minute'),
      latitude: localStorage.getItem('birth-latitude'), //10.6058073,
      longitude: localStorage.getItem('birth-longitude') //104.1767753
  });

  const horoscope = new Horoscope({
      origin,
      houseSystem: "whole-sign",
      zodiac: "tropical",
      aspectPoints: ['bodies', 'points', 'angles'],
      aspectWithPoints: ['bodies', 'points', 'angles'],
      aspectTypes: ["major", "minor"],
      customOrbs: {},
      language: 'en'
  });

  return getHoroscope(horoscope);
}
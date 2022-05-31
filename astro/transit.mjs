import { getHoroscope } from './horoscope.mjs';
const { Origin, Horoscope } = Astro;

export function transitHoroscope(year, month, day, hour, minute) {
    const date = new Date();
  
    const origin = new Origin({
        year: year || date.getFullYear(),
        month: month || date.getMonth(),
        date: day || date.getDate(),
        hour: hour || date.getHours(),
        minute: minute || date.getMinutes(),
        latitude: 36.7484123,
        longitude: -119.7938046,
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
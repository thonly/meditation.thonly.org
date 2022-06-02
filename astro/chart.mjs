import { natalHoroscope } from './natal.mjs';
import { transitHoroscope } from './transit.mjs';

let horoscope = null;

export function createNatalChart(elementID) {
    const { planets, cusps, As, Ds, Mc, Ic, Sun, Moon, Earth } = natalHoroscope();
    const transit = transitHoroscope();
    
    const element = document.getElementById(elementID);
    const chart = new astrology.Chart(elementID, element.offsetWidth, element.offsetWidth);
    const radix = chart.radix({ planets, cusps });
    radix.addPointsOfInterest({ As, Mc, Ds, Ic });
    horoscope = radix.transit({ planets: transit.planets, cusps: transit.cusps }).aspects();

    return { natal: { Sun, Moon, Earth }, transit: { Sun: transit.Sun, Moon: transit.Moon, Earth: transit.Earth } };
}

export function animateTransit() {
  const { planets, cusps, Sun, Moon, Earth } = transitHoroscope();
  
  horoscope.animate({ planets, cusps }, 1, false, () => {
    //console.log("Animation finished");
  });

  return { Sun, Moon, Earth };
}
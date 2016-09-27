import { Service } from 'ng-esm';


const HEX_REGEX = /^#?([0-9a-f]{3}([0-9a-f]{3})?)$/i,
      RGB_REGEX = /^rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)$/;

@Service()
export class Color {
  rgb(hex: string) {
    let matches = HEX_REGEX.exec(hex),
        digits = matches ? matches[1] : null,
        size = (digits || []).length === 3 ? 1 : 2,
        get = i => digits.slice(i * size, (i + 1) * size),
        c = d => parseInt(d.length === 2 ? d : d + d, 16);

    if (!digits) {
      return null;
    }

    return `rgb(${c(get(0))}, ${c(get(1))}, ${c(get(2))})`;
  }

  hex(rgb: string) {
    let matches = RGB_REGEX.exec(rgb),
        digits = matches ? matches.slice(1, 4).map(v => +v) : null,
        h = i => `0${digits[i].toString(16)}`.slice(-2);

    if (!digits || digits.some(v => v > 255)) {
      return null;
    }

    return `#${h(0)}${h(1)}${h(2)}`;
  }
}

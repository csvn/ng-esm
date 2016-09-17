import { Service } from 'ng-esm';

@Service()
export class Color {
  rgb(hex: string) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  hex(rgb: string) {
    let reg = /rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)/,
        matches = reg.exec(rgb),
        h = i => `0${(+matches[i]).toString(16)}`.slice(-2);

    return `#${h(1)}${h(2)}${h(3)}`;
  }
}

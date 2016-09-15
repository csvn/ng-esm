import { Filter, FilterTransform } from 'ng-esm';

@Filter({})
export default class Reverse implements FilterTransform {
  transform(val: string) {
    return val.split('').reverse().join('');
  }
}

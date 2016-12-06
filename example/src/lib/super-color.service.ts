import { Decorate } from 'ng-esm';
import { Color } from './color.service';


@Decorate(Color)
export class SuperColor extends Color {
  superColor() {
    return 'firebrick';
  }
}

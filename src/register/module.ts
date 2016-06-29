import { register } from '../ng';
import { Dependencies } from '../common';


export function Module(dependencies: Dependencies) {
  return function(target: Function): void {
    register(target, { dependencies }, true);
  };
}

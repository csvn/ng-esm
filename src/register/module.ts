import { Dependencies, register } from '../ng';


export function Module(dependencies: Dependencies) {
  return function(target: Function): void {
    register(target, { dependencies }, true);
  };
}

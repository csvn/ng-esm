import { register } from './ng';


export function Module(dependencies: Function[]) {
  return function(target: Function): void {
    register(target, { dependencies }, true);
  };
}

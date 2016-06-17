import { dependencyNames } from './ng';


export function Module(dependencies: Function[]) {
  return function(target: Function): void {
    angular.module(target.name, dependencyNames(dependencies));
  };
}

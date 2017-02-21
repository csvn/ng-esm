import * as ng from 'angular';
import { serviceName } from './service';
import { Dependencies } from '../common/interface';
import { createModule } from '../common/ng';


const MSG = `'Decorate' can only take classes decorated with '@Service()' as parameter.`;

export function Decorate(original: Function, dependencies: Dependencies = []) {
  return function(target: Function): void {
    const err = new Error(MSG);
    if (!ng.isFunction(original)) throw err;
    const origName = serviceName(original);
    if (!origName) throw err;

    dependencies.push(original);

    createModule(target, dependencies)
      .decorator(origName, target);
  };
}

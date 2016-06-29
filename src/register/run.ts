import { InjectConstructor, register } from '../ng';
import { Dependencies, OnInit } from '../common';


export function Run(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    register(target, { dependencies })
      .run(($injector: ng.auto.IInjectorService) => {
        $injector.invoke(target).$onInit();
      });
  };
}

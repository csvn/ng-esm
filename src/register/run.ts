import { Dependencies, InjectConstructor, OnInit, register } from '../ng';


export function Run(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    register(target, { dependencies })
      .run(($injector: angular.auto.IInjectorService) => {
        $injector.invoke(target).$onInit();
      });
  };
}

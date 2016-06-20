import { Dependencies, InjectConstructor, OnInit, register } from '../ng';


export function Config(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    register(target, { dependencies })
      .config(($injector: angular.auto.IInjectorService) => {
        $injector.invoke(target).$onInit();
      });
  };
}

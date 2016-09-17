import { Factory, FactoryCreator } from 'ng-esm';

@Factory()
export class Null implements FactoryCreator {
  $get($http) {
    console.log('Null service started', $http);
    return 'null';
  }
}

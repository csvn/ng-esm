import ng from 'angular';
import { Factory, FactoryCreator } from 'ng-esm';


export type Null = string;

@Factory({
  name: 'Null'
})
export class NullFactory implements FactoryCreator {
  $get($log: ng.ILogService) {
    $log.info('Null factory running');
    return 'null';
  }
}

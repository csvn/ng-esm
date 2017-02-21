import * as ng from 'angular';
import { Provider, FactoryCreator } from 'ng-esm';


export interface Logger {
  (...args: any[]): void;
}

@Provider({
  name: 'Logger'
})
export class LoggerProvider implements FactoryCreator {
  private prefix = '';
  private timestamp = false;

  $get($log: ng.ILogService, dateFilter: ng.IFilterDate) {
    return (...args: any[]) => {
      if (this.prefix) {
        args.unshift(this.prefix);
      }

      if (this.timestamp) {
        args.unshift(`(${dateFilter(Date.now(), 'HH:mm:ss:sss')})`);
      }

      $log.log(...args);
    };
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
    return this;
  }

  useTimestamp(timestamp: boolean) {
    this.timestamp = timestamp;
    return this;
  }
}

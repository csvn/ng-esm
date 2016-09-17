import { Config, Provider, OnInit, FactoryCreator } from 'ng-esm';

@Provider()
export class Logger implements FactoryCreator {
  prefix = '';
  timestamp = false;

  $get($log) {
    return (...args) => {
      if (this.prefix) {
        args.unshift(this.prefix);
      }

      if (this.timestamp) {
        args.unshift(Date.now());
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

@Config([Logger])
export class LoggerConfig implements OnInit {
  constructor(private LoggerProvider: Logger) {}

  $onInit() {
    this.LoggerProvider
      .useTimestamp(true)
      .setPrefix('Awesome:');
  }
}

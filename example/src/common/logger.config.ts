import { Config } from 'ng-esm';
import { LoggerProvider } from '../lib';


@Config([LoggerProvider])
export class LoggerConfig {
  constructor(LoggerProvider: LoggerProvider) {
    LoggerProvider
      .useTimestamp(true)
      .setPrefix('[ng-esm]');
  }
}

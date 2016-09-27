import { NgModule } from 'ng-esm';
import { Color } from './color.service';
import { Greeter } from './greeter.component';
import { Logger, LoggerProvider } from './logger.service';
import { Lorem } from './lorem.filter';
import { ChangeCount } from './change-count.directive';
import { Null, NullFactory } from './null.service';
import { Reverse } from './reverse.filter';
import { Ticker } from './ticker.component';


@NgModule([Color, Greeter, LoggerProvider, Lorem, ChangeCount, NullFactory, Reverse, Ticker])
export default class Library {}

export {
  Color,
  Greeter,
  Logger,
  LoggerProvider,
  Lorem,
  ChangeCount,
  Null,
  NullFactory,
  Reverse,
  Ticker
};

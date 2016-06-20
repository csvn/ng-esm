import 'angular';
import 'angular-aria';
import 'angular-animate';
import ngMaterial from 'angular-material';
import {
  Run,
  Config,
  Component,
  Filter,
  FilterTransform,
  Module,
  Service,

  OnInit
} from '../src/main';


@Run()
class Logger implements OnInit {
  constructor(private $log: ng.ILogService) {}

  $onInit() {
    this.$log.info('This is great');
    this.$log.log('we can print lots of stuff');
    this.$log.warn('but we should be careful');
    this.$log.error('logging can be bad');
  }
}

@Config()
class HttpConfig implements OnInit {
  constructor(private $httpProvider: ng.IHttpProvider) {}

  $onInit() {
    console.log('Setting $http config');
    this.$httpProvider.defaults.headers.get = { foo: 'bar' };
  }
}

@Component({ template: '<h1>Foooooo!</h1>' })
class MyView {
  $onInit() {
    console.log('MyView: Init!');
  }
}

@Service()
class Fooifyer {
  num: ng.IFilterNumber;

  constructor($filter) {
    this.num = $filter('number');
  }

  toFoo(val: string) {
    console.log('toFoo!');
    return `${this.num(val)} FOO`;
  }
}

@Filter({ dependencies: [Fooifyer] })
class Fooify implements FilterTransform {
  constructor(private fooifyer: Fooifyer) {}

  $transform(value: string): string {
    return this.fooifyer.toFoo(value);
  }
}

@Module([ngMaterial, Logger, HttpConfig, MyView, Fooify])
class App {}

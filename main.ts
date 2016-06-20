import 'angular';
import { Component, Filter, FilterTransform, Module } from './src/index';

@Component({ template: '<h1>Foooooo!</h1>' })
class MyView {
  $onInit() {
    console.log('MyView: Init!');
  }
}

@Filter()
class Fooify implements FilterTransform {
  num: angular.IFilterNumber;

  constructor($filter) {
    this.num = $filter('number');
  }

  $transform(value: string): string {
    return `${this.num(value)} FOO`;
  }
}

@Module([MyView, Fooify])
class App {}

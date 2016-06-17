import 'angular';
import { Component, Filter, Module } from './src/index';

@Component({ template: '<h1>Foooooo!</h1>' })
class MyView {
  $onInit() {
    console.log('Init!');
  }
}

Filter(fooify);
function fooify() {

}

@Module([MyView])
class App {}

# ng-esm

> ES2015 modules and decorators with Angular 1, complete with Typescript definition files

1. [Current progress](#current-progress)
2. [Motivation](#motivation)
3. [Goals](#goals)
4. [Usage](#usage)
    * [NgModule](#ngmodule)
    * [Component](#component)
    * [Directive](#directive)
    * [Filter](#filter)
    * [Service](#service)
    * [Factory/Provider](#factoryprovider)
    * [Config/Run](#configrun)
    * [State](#state)
    * [miscellaneous stuff](#miscellaneous-stuff)

## Current progress
* Documentation can still be improved a lot
* Unit tests are not yet implemented (only example usage as of yet)

## Motivation

Angular is awesome. The module system in Angular 1 when using es2015 import/export statements is... not as awesome. It typically results in a lot of extra wiring code and boilerplate which can be tricky to incorporate into a modern modular workflow.

```javascript
//# some.component.js
import angular from 'angular'; // avoiding globals

export default angular
  .module('is-this-really-needed?', [])
  .component(/* settings */)
  .name;

//# some.module.js
import angular from 'angular';
import someComponent from './some.component';

angular.module('might-be-needed', [someComponent]);
```

It's not uncommon for developers to want to avoid using globals. This results in importing "angular" in every file that want to register a component or service.

```javascript
import ng from 'angular';
```

It's also not uncommon to want to avoid duplicating magical angular module strings everywhere, which means we want to export the module name to avoid referring to it directly.

```javascript
export default angular
  .module('is-this-really-needed?', [])
  .component(/* settings */)
  .name;
```

It's possible to just create one angular module, and stick every directive, component, service and whatnot on that module. One drawback to this can be when a piece of code need to be tested in isolation (e.g. a config function unaffected by other config functions).


## Goals

* Conveniently decorate class as e.g. component/service for reduced boilerplate

* Allow classes as dependencies to skip exporting angular module strings

* Provide excellent tooling support via Typescript

* Match Angular2 syntax where it makes sense (decorators by themselves increase similarity to ng2)

## Usage

### Example

```javascript
// greeter.service.js
import { Service } from 'ng-esm';

const greeters = new Set();

@Service()
export class GreeterService {
  sayHello(name) {
    for (let greeter of greeters) {
      greeter.greet(name);
    }
  }
  register(greeterComponent) {
    greeters.add(greeterComponent);
  }
  unregister(greeterComponent) {
    greeters.delete(greeterComponent)
  }
}
```

```javascript
// greeter.component.js
import { Component } from 'ng-esm';
import { GreeterService } from './greeter.service';

@Component({
  dependencies: [GreeterService]
  bindings: {
    greeting: '@'
  },
  template: '<p>{{ $ctrl.greeting }} {{ $ctrl.name }}</p>'
})
export class MyGreeter {
  constructor(GreeterService) {
    this.name = 'John Doe';
    this.GreeterService = GreeterService;
  }
  $onInit() {
    this.GreeterService.register(this);
  }
  $onDestroy() {
    this.GreeterService.unregister(this);
  }
  greet(name) {
    this.name = name;
  }
}
```

```javascript
// greeter.module.js
import { NgModule } from 'ng-esm';
import { MyGreeter } from './greeter.component';

@NgModule('greeter', [MyGreeter])
class Greeter {}
```

If we would add `greeter` as a dependency to an angular module, we could then use `<my-greeter greeting="Hello"></my-greeter>` to create a component, and the `GreeterService.sayHello('Gabe')` to make all greeter components say hello.


### NgModule

```javascript
import { NgModule, ngModule } from 'ng-esm';

@NgModule([/* string/decorated-class dependencies */])
class Sauce {}
// module name: Sauce

@NgModule('awesome', [/* string/decorated-class dependencies */])
class Sauce {}
// module name: awesome

@NgModule({
  // all options are optional
  name: 'sweet',
  dependencies: [/* string/decorated-class dependencies */],
  values: {
    myVal: 'available to DI as "myVal"'
  },
  constants: {
    myConst: 'available to DI as "myConst"'
  }
})
class Sauce {}
// module name: sweet


// useful for seldom used api's, e.g. animation, decorator
// create a new angular module with generated name
ngModule();
// specify name
ngModule('myModule');
// specify dependencies (generated name)
ngModule(null, []);
// or both
ngModule('anotherModule', []);
```


### Component

```javascript
import { Component } from 'ng-esm';

@Component({
  name: 'myGreeter', // optional, camelCased class-name when missing
  dependencies: [], // optional, decorated classes or strings

  template: '<p>Hello world!</p>'
  // All `angular.module().component()` settings allowed
})
export class MyGreeter {
  $onInit() {}
}
```

### Directive

It's only practical to use this decorator if the directive uses a controller, and not compile/link with dependency injection.

```javascript
import { Directive } from 'ng-esm';

@Directive({
  name: 'myDirective', // optional, camelCased class-name when missing
  dependencies: [], // optional, decorated classes or strings
  bindToController: true,
  scope: {},
  restrict: 'A',
  require: {
    model: 'ngModel'
  }
  // All `angular.module().directive() settings allowed
})
export class MyDirectiveCtrl {
  constructor($element) {
    this.$element = $element;
  }

  $onInit() {
    this.model.parsers.push(v => !v);
  }
}
```

### Filter

```typescript
// Typescript example
import { Filter, FilterTransform } from 'ng-esm';

@Filter({
  name: 'percent', // optional, camelCased class name when missing
  dependencies: [] // optional, decorated classes or strings
})
export class PercentFilter implements FilterTransform {
  constructor(/* Injectables */) {}

  transform(value: number, decimals: number = 2) {
    return `${value.toFixed(decimals)} %`;
  }
}
```

### Service

```javascript
import { Service } from 'ng-esm';

@Service({
  name: 'myService', // optional, class name when missing
  dependencies: [] // optional, decorated classes or strings
})
export class MyService {
  constructor(/* Injectables */) {}

  serviceMethod() {}
}
```

### Factory/Provider

```typescript
import { Factory, Provider, FactoryCreator } from 'ng-esm';

// @Factory and @Provider has identical signatures for both decorator and class

@Factory({
  name: 'myFactory', // optional, class name when missing
  dependencies: [] // optional, decorated classes or strings
})
export class MyFactory implements FactoryCreator {
  constructor(/* Injectables */) {}

  $get(/* Injectables */): any {
    // Return an instance of the service
    return {};
  }

  // `@Provider()` may have additional methods for configuring the service during the config phase
}
```

> **Note:** When using `@Provider()`, only constants may be available to inject. This is due to angulars lifecycle.

### Config/Run

```typescript
// Typescript example
import { Run, Config, OnInit } from 'ng-esm';

@Run([/* string/decorated-class dependencies */])
export class SetupStuff implements OnInit {
  constructor(private someService) {}

  $onInit() {
    this.someService.doSomething();
  }
}

@Config([/* string/decorated-class dependencies */])
export class SetupMoreStuff implements OnInit {
  constructor(private someProvider) {}

  $onInit() {
    this.someProvider.doSomethingElse();
  }
}
```

### State

```javascript
import { State, resolve, Resolve } from 'ng-esm';

@Resolve({ aNumber: () => 123 })
@State({
  /*
    regular ui-router state configuration
    `controller` is not needed, as the decorated class is used
  */
  name: 'app.contacts',
  url: '/contacts',
  template: '<p>Foo!</p>'
})
export class ContactsController {
  constructor(aNumber) {}
}

@State({
  name: 'app.contacts.detail'
})
export class ContactsDetailController {
  constructor(aBool) {}

  @resolve
  static aBool() {
    return true;
  }
}
```

### miscellaneous stuff

```javascript
import { controllerAs, getNgModule, getModuleIds } from 'ng-esm';

// Set the default "controllerAs" name for component/directive/state
controllerAs('vm');

// Fetch an angular module for string or decorated class
getNgModule('app.contacts');

// Returns an array of strings with all registered angular modules ids
getModuleIds();
```

> **Note**: controllerAs() should be set before any controllers are registered. Also don't forget to load this option for unit tests. Set this option in a module loaded right after angular for both tests and app code.

# ng-esm

> ES2015 modules and decorators with Angular 1

## Progress
* Currently pre-alpha
* Missing `ng.Module` equivalents:
    * animation
    * constant
    * value
    * decorator
    * factory
    * provider
    * directive
    * controller
* Create unit tests for every register method
* Iteration and "Eat your own dog food" to improve the API
* Documentation

## Motivation

Angular is awesome. The module system in Angular 1 when using es2015 import/export statements is... not as awesome. It typically results in a lot of extra wiring code and boilerplate.

It's possible to just create one angular module, and stick every directive, component, service and whatnot on that module. One drawback to this can be when a piece of code need to be tested in isolation (e.g. a config function unaffected by other config functions).

Another solution is to create a new module for every file and component/service/filter/etc. This means every piece of code can easier specify it's own dependencies and be tested on it's own. This options means a lot of extra boilerplate for every file.


## Goal

Provide an easy way to register different angular components using modern Javascript (decorators), so you never need to create angular modules directly, and reduce the amount of code.

This project also uses TypeScript, so hopefully we can create a great experience with IntelliSense for those using this package.

It is *not* a primary goal to make it easier to migrate to Angular 2, but when possible we'll try to match concepts from it. Trying to abstract away modules and hopefully increasing speed and producing cleaner code is the main focus.

Let's get to the good stuff!


## Overview

### Component

The regular non-es2015 way:
```javascript
class MyComponentCtrl {
  $onInit() {}
}

export default angular
  .module('myComponent', [])
  .component('myComponent', {
    controllerAs: 'vm',
    controller: MyComponentCtrl,
    template: '<p>Foo!</p>'
  })
  .name;
```

With **ng-esm** and ES2015+decorators
```javascript
@Component({
  controllerAs: 'vm',
  template: '<p>Foo!</p>'
})
export default class MyComponent {
  $onInit() {}
}
```

> A property `name` can be provided in the `@Component` config, which will be used as the component name. The class' name will be used as component name if `name` property is missing. kebab-case and PascalCase will be converted to camelCase (e.g. "my-component" and "MyComponent" will both become "myComponent" and thus "<my-component>" in html.

> If a component has dependencies on other modules, a `dependencies` property can be specified as `(string | Function)[]`. Function work only if they are classes decorated with **ng-esm** (e.g. other `@Component`'s, `@Filter`'s, `@Service`'s etc).

### Module

I know we wanted to avoid Angular's modules, but sometimes it can be nice to group up a bunch of registered parts into a named module. It could be for a third party module, or simply exporting all `@Component`'s in a folder.

**header.component.js**
```javascript
import { Component } from 'ng-esm';

@Component({ templateUrl: '/header.component.html' })
export default class MyHeader {}
```

**sidebar.component.js**
```javascript
import { Component } from 'ng-esm';

@Component({ templateUrl: '/sidebar.component.html' })
export default class MySidebar {}
```

> Under the hood, both of the above components will be created in their own modules, with a random module ID. They can only become available when their classes are added to a module (or a dependency to other component/filter/etc).

**components.module.js**
```javascript
import header from './header.component';
import sidebar from './sidebar.component';

export default Module('components', [
  header,
  sidebar
]);
```

In the above example, an ng-module will be created with the name `"components"`, that can be used normally as a dependency in other modules/components, or bootstrapped with Angular.

-----------------------------------------------------------

## License
The MIT License (MIT)
Copyright (c) 2016 Christian Svensson <csvn.dev@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
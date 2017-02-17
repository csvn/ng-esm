# Changelog

## v2.0.0 (2017-02-17)

### Breaking changes

* Attempting to create an Angular module that already exists will now throw an error (834ab7cf0e66f0b3fab2b43a737e25b93550e3eb)

Before this change a module would be silently replaced when a module name already exists.
This is almost always an error, as such this will now throw an error instead.

If this is absolutely needed, just use angular regurlarly to accomplish this.

Before:
```javascript
import { NgModule } from 'ng-esm';

@NgModule('MyApp', [])
class SpectacularApp {}

@NgModule({
  name: 'MyApp', // Will be fine!
  dependencies: []
})
class AmazingApp {}

@NgModule([])
class MyApp {} // Will also be fine!
```

After:
```javascript
import { NgModule } from 'ng-esm';

@NgModule('MyApp', [])
class SpectacularApp {}

@NgModule({
  name: 'MyApp', // Throws error!
  dependencies: []
})
class AmazingApp {}

@NgModule([])
class MyApp {} // Also throws error!
```

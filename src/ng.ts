export {
  createModule,
  dependencyNames
};


const NAME_PROP = 'ng-esm:name';

function generateId() {
  return `ng-esm:id-${Math.random()}`;
}

function createModule(target: Function, dependencies?: string[]) {
  let id = generateId();

  if (target) {
    Reflect.defineProperty(target, NAME_PROP, { value: id });
  }

  console.log(`Declaring module ${id}`);
  return angular.module(id, dependencies || []);
}

function dependencyNames(deps: Function[]): string[] {
  return deps.map(d => d[NAME_PROP]);
}

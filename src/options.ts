import { config } from './ng';

const UNDEFINED = void 0;

export function controllerAs(name: string | null) {
  config.ctrlAs = name !== null ? name : UNDEFINED;
}

import { config } from './ng';

const UNDEFINED = void 0;


/**
 * Set the default value to use for "controllerAs" in component/directive/state configurations.
 * Make sure the file that sets this option is loaded before any directives that use "controllerAs".
 * Also make sure to load the file with this option for any unit tests.
 */
export function controllerAs(name: string | null) {
  config.ctrlAs = name !== null ? name : UNDEFINED;
}

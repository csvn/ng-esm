import { Module } from 'ng-esm';

import lorem from './lorem';
import reverse from './reverse';

@Module([lorem, reverse])
export default class Filters {}

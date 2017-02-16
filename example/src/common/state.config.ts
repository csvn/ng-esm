import { Config } from 'ng-esm';
import { UrlService } from 'angular-ui-router';


@Config()
export class StateConfig {
  constructor($urlServiceProvider: UrlService) {
    $urlServiceProvider.rules.when('', '/');
  }
}

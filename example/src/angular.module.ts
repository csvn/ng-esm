import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { AngularComponent, AngularAltComponent } from './lib';


@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    AngularComponent,
    AngularAltComponent
  ],
  entryComponents: [
    AngularComponent,
    AngularAltComponent
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}

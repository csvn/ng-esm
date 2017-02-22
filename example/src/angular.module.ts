import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { AngularComponent } from './lib';


@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    AngularComponent
  ],
  entryComponents: [
    AngularComponent
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}

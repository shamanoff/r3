import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsruComponent} from "./newsru/newsru.component";
import {CursorComponent} from "./israelinfo/israelinfo.component";
import {MigComponent} from "./mig/mig.component";
import {MeduzaComponent} from "./meduza/meduza.component";
import {NepComponent} from "./nep/nep.component";
import {MarkerComponent} from "./marker/marker.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CursorComponent,
    MigComponent,
    MeduzaComponent,
    NepComponent,
    MarkerComponent,
    NewsruComponent,
  ],
  exports: [
    CommonModule,
    CursorComponent,
    MigComponent,
    MeduzaComponent,
    NepComponent,
    MarkerComponent,
    NewsruComponent,
  ]
})
export class RssModule { }

import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent, HeaderComponent, SearchInputComponent } from './components';
import {NbActionsModule, NbContextMenuModule, NbIconModule, NbSearchModule, NbUserModule} from '@nebular/theme';
import { MayusculasPipe } from './pipes';
import { SortDirective } from './directivas/sort.directive';
import { RelojComponent } from './components/reloj/reloj.component';
import {XsegundoService} from '../@core/utils/tiempo.service';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SearchInputComponent,
    MayusculasPipe,
    SortDirective,
    RelojComponent
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        RelojComponent
    ],
  imports: [
    CommonModule,
    NbIconModule,
    NbActionsModule,
    NbSearchModule,
    NbUserModule,
    NbContextMenuModule
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        XsegundoService
      ]
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { RegistroLoginComponent } from './registro-login/registro-login.component';
import {NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../@theme/theme.module';
import { AyudaRegistroComponent } from './ayuda-registro/ayuda-registro.component';


@NgModule({
  declarations: [RegistroComponent, RegistroLoginComponent, AyudaRegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    NbAlertModule,
    NbLayoutModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    ThemeModule,
    NbCardModule
  ]
})
export class RegistroModule { }

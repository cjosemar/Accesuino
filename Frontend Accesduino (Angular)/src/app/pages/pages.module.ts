import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule
} from '@nebular/theme';
import {ThemeModule} from '../@theme/theme.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages.component';
import {AuthModule} from './auth/auth.module';
import { DatosEmpresaComponent } from './datos-empresa/datos-empresa.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AyudaGestionComponent } from './ayuda-gestion/ayuda-gestion.component';


@NgModule({
  declarations: [NotFoundComponent, PagesComponent, DatosEmpresaComponent, AyudaGestionComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        NbLayoutModule,
        ThemeModule,
        NbSidebarModule,
        NbMenuModule,
        NbCardModule,
        NbButtonModule,
        AuthModule,
        NbDialogModule.forChild(),
        NbIconModule,
        ReactiveFormsModule,
        NbInputModule,
        NbAlertModule
    ]
})
export class PagesModule { }

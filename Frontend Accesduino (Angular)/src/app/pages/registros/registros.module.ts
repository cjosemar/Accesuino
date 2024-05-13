import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosRoutingModule } from './registros-routing.module';
import { RegistrosComponent } from './registros.component';
import { RegistrosListComponent } from './registros-list/registros-list.component';
import { RegistrosModComponent } from './registros-mod/registros-mod.component';
import {
    NbAlertModule,
    NbAutocompleteModule, NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule
} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RegistrosComponent, RegistrosListComponent, RegistrosModComponent],
    imports: [
        CommonModule,
        RegistrosRoutingModule,
        NbCardModule,
        NbIconModule,
        NbSelectModule,
        NbInputModule,
        NbAutocompleteModule,
        ReactiveFormsModule,
        NbDatepickerModule,
        NbAlertModule,
        NbButtonModule
    ]
})
export class RegistrosModule { }

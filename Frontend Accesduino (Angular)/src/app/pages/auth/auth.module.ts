import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {NbAlertModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        NbAlertModule,
        ReactiveFormsModule,
        FormsModule,
        NbInputModule,
        NbCheckboxModule,
        NbButtonModule,
        NbLayoutModule,
        NbIconModule
    ]
})
export class AuthModule { }

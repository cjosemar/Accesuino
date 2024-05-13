import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRoutingModule } from './permisos-routing.module';
import { PermisosComponent } from './permisos.component';
import { PermisosAdminComponent } from './permisos-admin/permisos-admin.component';
import { TiposPermisoAdminComponent } from './tipos-permiso-admin/tipos-permiso-admin.component';
import { EditTipoPermisoComponent } from './tipos-permiso-admin/edit-tipo-permiso/edit-tipo-permiso.component';
import {NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import { EditPermisoComponent } from './permisos-admin/edit-permiso/edit-permiso.component';


@NgModule({
  declarations: [PermisosComponent, PermisosAdminComponent, TiposPermisoAdminComponent, EditTipoPermisoComponent, EditPermisoComponent],
    imports: [
        CommonModule,
        PermisosRoutingModule,
        NbCardModule,
        ReactiveFormsModule,
        NbInputModule,
        NbButtonModule,
        NbIconModule,
        NbSelectModule,
        NbAlertModule
    ]
})
export class PermisosModule { }

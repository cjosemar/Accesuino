import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { RolesAdminComponent } from './roles-admin/roles-admin.component';
import { PermissionsAdminComponent } from './permissions-admin/permissions-admin.component';
import {
    NbAccordionModule, NbAlertModule,
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule, NbListModule, NbSelectModule, NbUserModule
} from '@nebular/theme';
import { EditPermissionsComponent } from './permissions-admin/edit-permissions/edit-permissions.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditRoleComponent } from './roles-admin/edit-role/edit-role.component';
import { EditUserComponent } from './user-admin/edit-user/edit-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserAdminComponent,
    RolesAdminComponent,
    PermissionsAdminComponent,
    EditPermissionsComponent,
    EditRoleComponent,
    EditUserComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        NbLayoutModule,
        NbIconModule,
        NbCardModule,
        NbButtonModule,
        NbBadgeModule,
        NbInputModule,
        FormsModule,
        ReactiveFormsModule,
        NbAccordionModule,
        NbCheckboxModule,
        NbListModule,
        NbUserModule,
        NbSelectModule,
        NbAlertModule
    ]
})
export class UsersModule { }

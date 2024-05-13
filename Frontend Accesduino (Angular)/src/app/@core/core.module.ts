import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationService, ErrorInterceptor, JwtInterceptor} from './auth';
import {EnvironmentService, LayoutService, StorageService} from './utils';
import {UserCurrentService} from './auth';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {
  AssetsDataService,
  DatosEmpresaDataService,
  EmpleadosDataService,
  HorariosDataService,
  PermissionDataService, PuestosDataService, RolesDataService,
  UsersDataService
} from './datas';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationService,
        StorageService,
        LayoutService,
        EnvironmentService,
        UserCurrentService,
        AuthenticationService,
        UsersDataService,
        AssetsDataService,
        DatosEmpresaDataService,
        EmpleadosDataService,
        HorariosDataService,
        PermissionDataService,
        PuestosDataService,
        RolesDataService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
      ]
    }
  }
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} ya ha sido cargado. Importe módulos principales solo en AppModule`);
  }
}

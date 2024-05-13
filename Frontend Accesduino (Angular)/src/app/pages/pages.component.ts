import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {StorageService} from '../@core/utils';
import {MetaDatosModel, Permission, User} from '../@core/model';
import {UserCurrentService} from '../@core/auth';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  userCurrent: User;
  permissions: [Permission[]];
  meta: MetaDatosModel;


  menu: NbMenuItem[] = [];

  constructor (
    private storageService: StorageService,
    private userCurrentService: UserCurrentService
  ) {

    // this.userCurrent = this.storageService.getCurrentUser();


  }

  ngOnInit(): void {
    this.userCurrentService.currenUser.subscribe((user:User) => {
      //console.log(user);
      if (user) {
        this.permissions = user.roles[0][0].permissions;
        this.getMenuUser();
      }
    });
  }

  getMenuUser() {
    this.menu = [
      {
        title: 'Dashboard',
        icon: 'home-outline',
        link: '/pages/dashboard',
        home: true
      },
      {
        title: 'Gestión',
        group: true,
      },
      {
        title: 'Empleados',
        icon: 'people-outline',
        hidden: this.permissions[0]?.filter( p => p.name == 'List empleados' ||
          p.name == 'List puestos' || p.name == 'List horarios').length == 0,
        children: [
          {
            title: 'Empleados',
            link: '/pages/empleados',
            hidden: this.permissions[0]?.filter( p => p.name == 'List empleados').length == 0,
          },
          {
            title: 'Puestos',
            link: '/pages/empleados/puestos',
            hidden: this.permissions[0]?.filter( p => p.name == 'List puestos').length == 0,
          },
          {
            title: 'Horarios',
            link: '/pages/empleados/horarios',
            hidden: this.permissions[0]?.filter( p => p.name == 'List horarios').length == 0,
          }
        ]
      },
      {
        title: 'Permisos',
        icon: 'calendar-outline',
        hidden: this.permissions[0]?.filter( p => p.name == 'List permisosTrabajo'
          || p.name == 'List tipoPermiso').length == 0,
        children: [
          {
            title: 'Permisos',
            link: '/pages/permisos',
            hidden: this.permissions[0]?.filter( p => p.name == 'List permisosTrabajo').length == 0
          },
          {
            title: 'Tipos Permiso',
            link: '/pages/permisos/tipos',
            hidden: this.permissions[0]?.filter( p => p.name == 'List tipoPermiso').length == 0
          }
        ]
      },
      {
        title: 'Registros',
        icon: 'clock-outline',
        hidden: this.permissions[0]?.filter( p => p.name == 'List registros').length == 0,
        children: [
          {
            title: 'Administrar Registros',
            link: '/pages/registros',
            hidden: this.permissions[0]?.filter( p => p.name == 'List registros').length == 0,
          }
        ]
      },
      {
        title: 'Reportes',
        group: true
      },
      {
        title: 'Empleados',
        icon: 'people',
        hidden: this.permissions[0]?.filter( p => p.name == 'Run reportes').length == 0 ||
          this.permissions[0]?.filter( p => p.name == 'List empleados').length == 0,
        children: [
          {
            title: 'Empleados',
            link: '/pages/reportesEmpleados',
            hidden: this.permissions[0]?.filter( p => p.name == 'List empleados').length == 0,
          },
          {
            title: 'Empleados - Puesto',
            link: '/pages/reportesEmpleados/empleadosPuestos',
            hidden: this.permissions[0]?.filter( p => p.name == 'List empleados').length == 0,
          },
          {
            title: 'Empleados - Horario',
            link: '/pages/reportesEmpleados/empeladosHorarios',
            hidden: this.permissions[0]?.filter( p => p.name == 'List empleados').length == 0,
          }
        ]
      },
      {
        title: 'Permisos',
        icon: 'calendar',
        hidden: this.permissions[0]?.filter( p => p.name == 'Run reportes').length == 0 ||
          this.permissions[0]?.filter( p => p.name == 'List permisosTrabajo').length == 0,
        children: [
          {
            title: 'Permisos',
            link: '/pages/reportesPermisos',
            hidden: this.permissions[0]?.filter( p => p.name == 'List permisosTrabajo').length == 0,
          },
          {
            title: 'Permisos - Mes',
            link: '/pages/reportesPermisos/permisosMes',
            hidden: this.permissions[0]?.filter( p => p.name == 'List permisosTrabajo').length == 0,
          },
          {
            title: 'Permisos - Personal',
            link: '/pages/reportesPermisos/permisosPersonal',
            hidden: this.permissions[0]?.filter( p => p.name == 'List permisosTrabajo').length == 0,
          }
        ]
      },
      {
        title: 'Registros',
        icon: 'clock',
        hidden: this.permissions[0]?.filter( p => p.name == 'Run reportes').length == 0 ||
          this.permissions[0]?.filter( p => p.name == 'List registros').length == 0,
        children: [
          {
            title: 'Registros',
            link: '/pages/reportesRegistros',
            hidden: this.permissions[0]?.filter( p => p.name == 'List registros').length == 0,
          },
          {
            title: 'Registros - Empleados',
            link: '/pages/reportesRegistros/registrosEmpleado',
            hidden: this.permissions[0]?.filter( p => p.name == 'List registros').length == 0,
          }
        ]
      },
      {
        title: 'Administración',
        group: true,
        hidden: this.permissions[0]?.filter( p => p.name == 'List users' ||
          p.name == 'List roles' || p.name == 'List permissions' ||
          p.name == 'List datos').length == 0
      },
      {
        title: 'Datos Empresa',
        icon: 'cube',
        link: '/pages/datos',
        hidden: this.permissions[0]?.filter( p => p.name == 'List datos').length == 0
      },
      {
        title: 'Usuarios',
        icon: 'people',
        hidden: this.permissions[0]?.filter( p => p.name == 'List users' ||
          p.name == 'List roles' || p.name == 'List permissions').length == 0,
        children: [
          {
            title: 'Gestion Usuarios',
            icon: 'person-add',
            link: '/pages/users/users',
            hidden: this.permissions[0]?.filter( p => p.name == 'List users').length == 0
          },
          {
            title: 'Roles',
            icon: 'award',
            link: '/pages/users/roles',
            hidden: this.permissions[0]?.filter( p => p.name == 'List roles').length == 0
          },
          {
            title: 'Permisos',
            icon: 'checkmark-circle',
            link: '/pages/users/permissions',
            hidden: this.permissions[0]?.filter( p => p.name == 'List permissions').length == 0
          }
        ]
      }
    ];

  }


}

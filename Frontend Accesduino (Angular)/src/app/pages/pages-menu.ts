import {NbMenuItem} from '@nebular/theme';
import {toTitleCase} from 'codelyzer/util/utils';


export const MENU_ITEMS2: NbMenuItem[] = [
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
    hidden: false,
    children: [
      {
        title: 'Empleados',
        link: '/pages/empleados',
        hidden: false,
      },
      {
        title: 'Puestos',
        link: '/pages/empleados/puestos',
        hidden: false,
      },
      {
        title: 'Horarios',
        link: '/pages/empleados/horarios',
        hidden: false,
      }
    ]
  },
  {
    title: 'Permisos',
    icon: 'calendar-outline',
    hidden: false,
    children: [
      {
        title: 'Permisos',
        link: '/pages/permisos',
        hidden: false
      },
      {
        title: 'Tipos Permiso',
        link: '/pages/permisos/tipos',
        hidden: false
      }
    ]
  },
  {
    title: 'Registros',
    icon: 'clock-outline',
    hidden: false,
    children: [
      {
        title: 'Administrar Registros',
        link: '/pages/registros',
        hidden: false,
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
    hidden: false,
    children: [
      {
        title: 'Empleados',
        link: '/pages/reportesEmpleados',
        hidden: false,
      },
      {
        title: 'Empleados - Puesto',
        link: '/pages/reportesEmpleados/empleadosPuestos',
        hidden: false,
      },
      {
        title: 'Empleados - Horario',
        link: '/pages/reportesEmpleados/empeladosHorarios',
        hidden: false,
      }
    ]
  },
  {
    title: 'Permisos',
    icon: 'calendar',
    hidden: false,
    children: [
      {
        title: 'Permisos',
        link: '/pages/reportesPermisos',
        hidden: false,
      },
      {
        title: 'Permisos - Mes',
        link: '/pages/reportesPermisos/permisosMes',
        hidden: false,
      },
      {
        title: 'Permisos - Personal',
        link: '/pages/reportesPermisos/permisosPersonal',
        hidden: false,
      }
    ]
  },
  {
    title: 'Registros',
    icon: 'clock',
    hidden: false,
    children: [
      {
        title: 'Registros',
        link: '/pages/reportesRegistros',
        hidden: false,
      },
      {
        title: 'Registros - Empleados',
        link: '/pages/reportesRegistros/registrosEmpleado',
        hidden: false,
      }
    ]
  },
  {
    title: 'Administración',
    group: true
  },
  {
    title: 'Datos Empresa',
    icon: 'cube',
    link: '/pages/datos'
  },
  {
    title: 'Usuarios',
    icon: 'people',
    children: [
      {
        title: 'Gestion Usuarios',
        icon: 'person-add',
        link: '/pages/users/users'
      },
      {
        title: 'Roles',
        icon: 'award',
        link: '/pages/users/roles'
      },
      {
        title: 'Permisos',
        icon: 'checkmark-circle',
        link: '/pages/users/permissions'
      }
    ]
  }
]

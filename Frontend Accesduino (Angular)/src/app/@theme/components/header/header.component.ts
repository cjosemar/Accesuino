import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import {LayoutService, StorageService} from '../../../@core/utils';
import {AuthenticationService, UserCurrentService} from '../../../@core/auth';
import {User, DatosEmpresa} from '../../../@core/model';

import {ActivatedRoute, Router} from '@angular/router';
import {DatosEmpresaDataService} from '../../../@core/datas/datos-empresa-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly UUIDNOTIMG = '577b9518-fc37-4d61-91b4-77ad9b635097';

  userSoloImg: boolean = false;
  user: User;
  datos: DatosEmpresa;
  tagUser: string = 'userMenu';

  userMenu: NbMenuItem[] = [
    {
      title: 'Datos',
      icon: 'person',
      link:''
    },
    {
      title: 'Ayuda',
      icon: 'question-mark-outline',
      target: 'ayuda'
    },
    {
      title: 'Desconectar',
      icon: 'log-out',
      target: 'logout'
    }
  ];

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private authenticationService: AuthenticationService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private userCurrentService: UserCurrentService,
    private datosEmpresaDb: DatosEmpresaDataService
  ) {
    this.user = this.storage.getCurrentUser();
  }

  ngOnInit(): void {
    this.menuService.onItemClick().subscribe(accion => {
      if (accion.item.target === 'logout') {
        this.authenticationService.logOut().then(() => {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 500);
        });
      } else if (accion.item.target === 'ayuda') {
        setTimeout(() => {
          let baseUrl = window.location.href.replace(this.router.url, '');
          window.open(baseUrl + '/ayudaGestion', '' , '_blank');
        }, 200);
      }
    });
    this.userCurrentService.onUserInfoChanged().subscribe(user => {
      this.user = user;
    });

    this.datosEmpresaDb.getDatosEmpresa().then(datos => {
      this.datos = datos;
    });

  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  logout() {

  }

}

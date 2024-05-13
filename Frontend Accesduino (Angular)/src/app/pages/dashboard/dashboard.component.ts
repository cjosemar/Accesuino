import { Component, OnInit } from '@angular/core';
import {AssetsDataService, DatosEmpresaDataService} from '../../@core/datas';
import {DatosEmpresa} from '../../@core/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  imgNot: string;
  datos: DatosEmpresa;

  constructor(
    private datosEmpresaDb: DatosEmpresaDataService,
    private assetDb: AssetsDataService
  ) {
    this.imgNot = assetDb.getUIDNotImage();
  }

  ngOnInit(): void {
    this.datosEmpresaDb.getDatosEmpresa().then(datos => {
      this.datos = datos;
    })

  }

}

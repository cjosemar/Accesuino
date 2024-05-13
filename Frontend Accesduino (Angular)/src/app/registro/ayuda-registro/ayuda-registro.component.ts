import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ayuda-registro',
  templateUrl: './ayuda-registro.component.html',
  styleUrls: ['./ayuda-registro.component.scss']
})
export class AyudaRegistroComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }

}

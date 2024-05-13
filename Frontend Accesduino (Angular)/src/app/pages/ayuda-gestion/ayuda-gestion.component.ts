import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ayuda-gestion',
  templateUrl: './ayuda-gestion.component.html',
  styleUrls: ['./ayuda-gestion.component.scss']
})
export class AyudaGestionComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

}

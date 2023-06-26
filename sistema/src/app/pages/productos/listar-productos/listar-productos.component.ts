import { Component, OnInit } from '@angular/core';
import { Vuelo } from 'src/app/models/vuelo';

import { VuelosService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{

  listVuelos: Vuelo[] = [];
  elementos: number = 0;

  constructor(private _productoService: VuelosService) {

  }

  ngOnInit(): void {

    this.obtenerVuelos();

  }

  exportarPDF () {
    this._productoService.getPdf().subscribe(response => {
      const file = new Blob([response], { type: 'application/pdf' });

      const url = URL.createObjectURL(file);
      window.open(url)

      const a = document.createElement('a');
      a.href = url;
      a.download = 'MisProductos.pdf';

      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);

    }, error => {
      console.error('Error al descargar el PDF:', error);
    })
  }

  obtenerVuelos(){
    this._productoService.getVuelos().subscribe(data => {
      console.log(data);
      this.listVuelos = data;
      this.elementos = this.listVuelos.length;
    })
  }
}

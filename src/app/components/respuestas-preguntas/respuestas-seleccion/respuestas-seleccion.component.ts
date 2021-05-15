import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSnackBar, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-respuestas-seleccion',
  templateUrl: './respuestas-seleccion.component.html',
  styleUrls: ['./respuestas-seleccion.component.css']
})
export class RespuestasSeleccionComponent implements OnInit {

  @Input() item : any={};
  @Input() oculto : any=0;
  tablaRespuestas = ['#','respuesta'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private snackBarComponent: MatSnackBar) {
  }

  ngOnInit() {
    this._consultarOpcionesPreguntasAbiertas();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  _listaOpcionesPreguntasSeleccion:any[]=[];

  _consultarOpcionesPreguntasAbiertas(){
    this._listaOpcionesPreguntasSeleccion=[];
    this.dataSource.data = this.item.ListaRespuestas; 
  }

}

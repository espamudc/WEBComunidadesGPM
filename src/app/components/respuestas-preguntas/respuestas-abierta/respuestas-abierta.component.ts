import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSnackBar, MatTable } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-respuestas-abierta',
  templateUrl: './respuestas-abierta.component.html',
  styleUrls: ['./respuestas-abierta.component.css']
})
export class RespuestasAbiertaComponent implements OnInit {

  @Input() item : any={};
  @Input() oculto : any=0;
  tablaRespuestas = ['respuesta'];
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

  _listaOpcionesPreguntasAbiertas:any[]=[];

  _consultarOpcionesPreguntasAbiertas(){
    this._listaOpcionesPreguntasAbiertas=[];
    this.dataSource.data = this.item.ListaRespuestas; 
  }

}

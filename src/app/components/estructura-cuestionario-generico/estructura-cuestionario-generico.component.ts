import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { MatSnackBar, MatTable, MatTableDataSource, MatDialog } from '@angular/material';

@Component({
  selector: 'app-estructura-cuestionario-generico',
  templateUrl: './estructura-cuestionario-generico.component.html',
  styleUrls: ['./estructura-cuestionario-generico.component.css']
})
export class EstructuraCuestionarioGenericoComponent implements OnInit {

  constructor(
    private snackBarComponent: MatSnackBar,

  ) { }

  ngOnInit() {
  }

}

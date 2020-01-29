import { MatSnackBar } from "@angular/material";
export class Metodos {
    constructor(
        private snackBarComponent: MatSnackBar
    ){}

    _mensaje(_mensaje:string,_duracion?:number){
        let _tiempo:number = 2000;
        if (_duracion!=null) {
          _tiempo = _duracion;
        }
      let snackBarRef = this.snackBarComponent.open(_mensaje,null,{duration:_tiempo,panelClass:['text-white','bg-primary'],data:{}});
    }
}

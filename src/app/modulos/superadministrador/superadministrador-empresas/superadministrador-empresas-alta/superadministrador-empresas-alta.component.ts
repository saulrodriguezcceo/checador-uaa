import { AgmMap, MapsAPILoader } from '@agm/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { Profesor } from 'src/app/modelos/profesor.model';
import { ProfesorService } from 'src/app/servicios/escuela/profesor.service';
@Component({
  selector: 'app-superadministrador-empresas-alta',
  templateUrl: './superadministrador-empresas-alta.component.html',
  styleUrls: ['./superadministrador-empresas-alta.component.scss']
})
export class SuperadministradorEmpresasAltaComponent implements OnInit {
  datosForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SuperadministradorEmpresasAltaComponent>,
    private _formBuilder: FormBuilder,
    private _serProfesor: ProfesorService,

  ) {
  }

  ngOnInit(): void {
    this.iniciarFormBuilder();
  }
  iniciarFormBuilder() {
    this.datosForm = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
    });
  }
  onDismiss(): void {
    this.dialogRef.close(null);
  }
  public agregarEmpresa() {
    try{
      if(this.datosForm.valid){
        let profesor: Profesor = (<Profesor>this.datosForm.value)
        profesor.activo = true;
        this.guardarProfesor(profesor);
      }
    }catch(err){
      console.log(err);
    }
   
  }
  public guardarProfesor(profesor: Profesor) {
    return new Promise((resolve, reject) => {
      this._serProfesor.guardarProfesor(profesor).subscribe(
        (profesor: Profesor) => {
          this.dialogRef.close(null);
          resolve(null);
        }, (err: HttpErrorResponse) => {
          reject();
        }
      )
    })
  }
}

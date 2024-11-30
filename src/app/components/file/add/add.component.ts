import { Component, Inject, OnInit } from '@angular/core';
import { Files } from '../../../models/File';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListModule } from '@angular/material/list';
import { DatePipe, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileService } from '../../../service/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-add',
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit{
  public fileGroup!:FormGroup;
  private idFile!:number;
  public isEdit:boolean = false

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
    private fileService:FileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ){}

  ngOnInit(): void {

    this.fileGroup = this.fb.group({
      type: ['', [Validators.required]],
      weight: ['', [Validators.required,Validators.pattern('^[+-]?[0-9]+$')]],
      quantity: ['', [Validators.required,Validators.pattern('^[+-]?[0-9]+(\.[0-9]+)?$')]]
    });

    if(this.data.element.id){
      console.warn(this.data.element)
      this.isEdit = true
      this.idFile = this.data.element.id
      this.setData(this.data.element);
    }
  }


  setData(data:Files){
    this.fileGroup = this.fb.group({
      type: [data.type, [Validators.required]],
      weight: [data.weight, [Validators.required,Validators.pattern('^[+-]?[0-9]+$')]],
      quantity: [data.quantity, [Validators.required,Validators.pattern('^[+-]?[0-9]+(\.[0-9]+)?$')]]
    });
  }
  


  addFile(){
    if(this.fileGroup.valid){
      const data:Files = this.fileGroup.value as Files;
      data.id = this.idFile
      
      if(!this.isEdit){
        
        this.fileService.addFile(data).subscribe({
          next:(res:any)=>{
            this.dialogRef.close(true)
            this.snackBar.open("Archivo guardado correctamente", "OK", {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            
          },
          error:(err:any)=>{
            this.snackBar.open(err.message, "OK", {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
          
        })

      }else{
        this.fileService.updateFile(data).subscribe({
          next:(res:any)=>{
            this.dialogRef.close(true)
            this.snackBar.open("Archivo modificado correctamente", "OK", {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            
          },
          error:(err:any)=>{
            this.snackBar.open(err.message, "OK", {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
          
        })
      }



    }else{
      this.snackBar.open("Complete todos los campos", "OK", {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }






}

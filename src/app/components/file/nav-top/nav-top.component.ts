import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { AddComponent } from '../add/add.component';
import { FilesComponent } from '../files/files.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FileService } from '../../../service/file.service';
import { Files } from '../../../models/File';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-top',
  imports: [
    MatButtonModule,
    MatIconModule,
    //RouterOutlet,
    //FilesComponent
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './nav-top.component.html',
  styleUrl: './nav-top.component.css'
})
export class NavTopComponent implements OnInit{
  displayedColumns: string[] = ['type','weight','qua','act']

  dataSource = new MatTableDataSource<Files>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog:MatDialog,
    public matDialog: MatDialog,
    private fileService: FileService,
    private snackBar:MatSnackBar,

  ){}

  ngOnInit(): void {
    this.getAllFiles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  getAllFiles(){
    this.fileService.getAll().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource<Files>(res.body.files);
        this.dataSource.paginator = this.paginator;
      },
      error:(err)=>{

      }

    })
  }

  add(){
    const addDialog = this.dialog.open(AddComponent,{
      width:"500px",
      data:{}
    })

    addDialog.afterClosed().subscribe((response:Files) =>{
      if(response){
        this.getAllFiles();
        //const currentFiles = this.dataSource.data;
        //this.dataSource.data = [...currentFiles,response]
      }


    })

  }



  edit(element:Files){

    const addDialog = this.dialog.open(AddComponent,{
      width:"500px",
      data:{element}
    })

    addDialog.afterClosed().subscribe((response:Files) =>{
      if(response){
        this.getAllFiles();
        //const currentFiles = this.dataSource.data;
        //this.dataSource.data = [...currentFiles,response]
      }


    })
    //console.log("edit: " + element.id)
  }

  delete(id:number){
    this.fileService.deleteFile(id).subscribe((response:any) =>{
      if(response){
        this.getAllFiles();
        this.snackBar.open(response.body, "OK", {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }


    })
  }




  


  sumWeight(){
    const data = this.dataSource.data;
    return data.reduce((total:number,file)=> total + parseInt(file.weight.toString()),0)
  }

  sumQuantity(){
    const data = this.dataSource.data;
    return data.reduce((total:number,file)=> total + parseInt(file.quantity.toString()),0)
  }







}

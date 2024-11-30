import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Files } from '../../../models/File';
import { FileService } from '../../../service/file.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-files',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatIcon,


  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent implements OnInit{
  displayedColumns: string[] = ['id','type','weight','qua','act']

  dataSource = new MatTableDataSource<Files>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;





  constructor(
    public matDialog: MatDialog,
    private fileService: FileService,
    private router:Router
  ) {}



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



  edit(element:Files){

  }

  delete(id:number){

  }

}

import { Routes } from "@angular/router";
import { FilesComponent } from "./files/files.component";

export const FILE_ROUTES:Routes=[
    {
      path:''  ,
      redirectTo: 'files',
      pathMatch:'full'
    },
    { path:'files', component:FilesComponent },
    
]
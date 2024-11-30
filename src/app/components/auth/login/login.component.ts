import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../service/user.service';
import { StorageService } from '../../../service/storage.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../../models/User';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public loginGroup!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
    private userService:UserService,
    private storageService:StorageService,
    private router:Router,


    
  ){

  }

  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      password: ['', [Validators.required,Validators.minLength(5)]]
    });
  }

  async login() {

    if(this.loginGroup.valid){

      const user:UserLogin = this.loginGroup.value as UserLogin;
      await this.userService.login(user).subscribe({
        next:(response)=>{
          this.storageService.setToken(response.body.token.toString())
          this.snackBar.open(response.body.message, "OK", {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigateByUrl("main");
        },
        error:(err)=>{
          console.log(err)
        }
      })

      
    }else{
     /* this.snackBar.open('Username or Password ist validswwwwwaaawwwwwwwwww','', {
        duration: 3000, // Duración en milisegundos
        horizontalPosition: 'start', // Posición horizontal
        verticalPosition: 'top', // Posición vertical
        panelClass: ['custom-snackbar'] // Clase CSS personalizada
      });*/
      this.snackBar.open('algo salio mals', '', {
        duration: 3000,
        verticalPosition:"bottom",
        horizontalPosition:"center"

      });
    }
  }

}

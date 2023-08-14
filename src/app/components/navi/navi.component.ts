import { ConstantPool } from '@angular/compiler';
import { AuthService } from './../../services/auth.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {
user:User = null;
isUserAuthenticated :boolean = false;
isUserPartnership :boolean = false;
constructor(private authService:AuthService){}
ngOnInit(){
  this.isAuthenticated();
  this.isPartnership();
 
}

isAuthenticated() {
  const isAuthenticated = this.authService.isAuthenticated();
  if (isAuthenticated) {
    const userId = this.findAuthenticatedUser();
    this.getUserById(userId);
  }
  this.isUserAuthenticated = isAuthenticated;
}
findAuthenticatedUser(): number {
  return this.authService.findAuthenticatedUser();
}
getUserById(id:number){
  this.authService.getuserbyid(id).subscribe(response=>{
    if(response.success){
      this.user = response.data;
    }
  })
}
isPartnership(){
  this.isUserPartnership = this.authService.isPartnership();
}
logout(){
  this.authService.logout();
  this.isUserAuthenticated = false;
  this.isUserPartnership = false;
  this.user= null;
}
}

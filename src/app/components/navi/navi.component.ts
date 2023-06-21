import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {

constructor(private authService:AuthService){}

isAuthenticated(){
  return this.authService.isAuthenticated();
}
logout(){
  this.authService.logout();
}
}

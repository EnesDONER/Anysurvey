import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PartnershipGuard implements CanActivate {
  constructor(private authService:AuthService,
    private toastrService:ToastrService,
     private router:Router){

 }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isPartnership()){
        return true;
      }else{
        this.router.navigate(["loginpartnership"])
        this.toastrService.info("You must login to the system")
        return false;
      }
     }
  
}

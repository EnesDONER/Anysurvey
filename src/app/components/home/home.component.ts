import { Component, NgModule } from '@angular/core';
const auto = true;
const intervalTime =5000;
let slideInterval;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ngOnInit(): void {
    if(auto) {
      slideInterval=setInterval(this.nextSlide,intervalTime)
    } 
  }
  nextSlide(){
    const activeSlide= document.querySelector('.active');
    activeSlide?.classList.remove('active');
    if(activeSlide?.nextElementSibling){
      activeSlide.nextElementSibling.classList.add('active');
      console.log(activeSlide.nextElementSibling.innerHTML)
    }else{
      const slides = document.querySelectorAll('.slide');
      slides[0].classList.add('active');
    }

  }
  prevSlide(){
    const activeSlide= document.querySelector('.active');
    activeSlide?.classList.remove('active');
    if(activeSlide?.previousElementSibling){
      activeSlide.previousElementSibling.classList.add('active');
    }else{
      const slides = document.querySelectorAll('.slide');
      slides[slides.length-1].classList.add('active');
    }
  }

}




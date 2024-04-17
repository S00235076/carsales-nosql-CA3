import { Component } from '@angular/core';
import { CarApiService } from '../../services/car-api.service';
import { ICar, NewCar } from '../../interfaces/car';
import { CommonModule } from '@angular/common';

import { CarComponent } from '../car/car.component';


//import { Output } from '@angular/core';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-carlist',
  standalone: true,
  imports: [CommonModule, CarComponent],
  templateUrl: './carlist.component.html',
  styleUrl: './carlist.component.css'
})
export class CarlistComponent {

  carsData?: ICar | any;
  show: boolean = false;
  //@Output() CarDeletedEvent = new EventEmitter<string>()

  constructor(  private _carAPIService: CarApiService) {

  }
  ngOnInit() {
    this.getCars()
  }

  getCars() {
    this._carAPIService.getCarDetails().subscribe(carsData =>
      { this.carsData = carsData
    });
  }

  deleteCar(){
   // this.CarDeletedEvent.emit("car got deleted");
  }

  refreshCars(){
    this.getCars();
  }

  addCar(make:string, model:string, year:string,imageUrl:string):boolean {
    let addCar:ICar;
    addCar=new NewCar(make,model,year,imageUrl);
    this._carAPIService.addCarDetails(addCar).subscribe(carsData =>
      { this.carsData = carsData}
    );
    this.getCars() 
    return false;
  }

}

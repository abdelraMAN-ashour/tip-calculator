import { Injectable, signal } from '@angular/core';
import { TipField } from '../tip-calc/TipFields.interface';

@Injectable({
  providedIn: 'root'
})
export class TipService {
  private tipAmount=0;
  private total=0;
  reset=signal<boolean>(false)
  showReset=signal<boolean>(false)
  data?:TipField;
  setTipValues(data:TipField){
    this.data=data
    if(data.bill!=null&&data.peopleCount!=null&&data.tip!=null){
      this.showReset.set(true)
      let ta=data.bill*(data.tip/100)
      let total=ta+data.bill;
      this.tipAmount=ta/(data.peopleCount||1)
      this.total=total/(data.peopleCount||1)
    }
    if(data?.bill===0&&data?.peopleCount===0&&data?.tip===0){
      this.showReset.set(false);      
    }
  }
  getTipValues(){
    return {amount:this.tipAmount,total:this.total}
  }
  constructor() { }
}

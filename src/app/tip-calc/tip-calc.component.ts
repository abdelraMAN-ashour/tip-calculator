import { Component,effect} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipService } from '../services/tip.service';

type InputValue= "bill"|"numPeople"|"custom";

@Component({
  selector: 'app-tip-calc',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tip-calc.component.html',
  styleUrl: './tip-calc.component.css'
})
export class TipCalcComponent {
  constructor(private tipService:TipService){
    effect(()=>{
      if(this.tipService.reset()){
        this.selectedTip=undefined
        this.custom=undefined
        this.bill=undefined
        this.numPeople=undefined
        this.isZero=false
        this.tipService.reset.set(false)
        this.tipService.setTipValues({bill:0,peopleCount:0,tip:0})
        this.wrongValue={
          bill:false,
          custom:false,
          numPeople:false
        }
      }
    },{ allowSignalWrites: true })
  }

  tips=[5,10,15,25,50,-1]
  custom?:number;
  numPeople?:number;
  bill?:number;
  isZero=false;
  selectedTip?:number;

  selectTip(n:number){
    this.custom=undefined
    this.wrongValue.custom=false
    this.selectedTip=n;
    this.setTipsVal()
  }

  wrongValue={
    custom:false,
    bill:false,
    numPeople:false,
  }
  onInputClick(){
    this.selectedTip=undefined
  }

  onInputing(e:any){
    let id:InputValue=e.target.id;
    if((id==="numPeople"&&!(e.target.value==="")&&+e.target.value===0))this.isZero=true
    else this.isZero=false
    if((e.target.value==="")||(+e.target.value<0)){
      this.wrongValue[id]=true;
    }
    else{
      this.wrongValue[id]=false;
    }
    if(id==="numPeople"&&e.target.value.includes(".")){
      this.wrongValue.numPeople=true;      
    }
    this.setTipsVal()

  }

  setTipsVal(){
    if(
        !this.wrongValue.custom&&
        !this.wrongValue.bill&&       
        !this.wrongValue.numPeople
      )
      this.tipService.setTipValues({
        bill:this.bill!,
        peopleCount:this.numPeople!,
        tip:this.custom||this.selectedTip!
      })
      else this.tipService.showReset.set(false)
  }
}

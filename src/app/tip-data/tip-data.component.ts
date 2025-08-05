import { Component, effect } from '@angular/core';
import { TipService } from '../services/tip.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-tip-data',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './tip-data.component.html',
  styleUrl: './tip-data.component.css'
})
export class TipDataComponent {
  constructor(private tipService:TipService){
    effect(()=>{
      this.tipService.reset();
      this.getData
    })
    effect(()=>{
      this.tipService.showReset();
      this.showReset
    })
  }
  get getData(){
    return this.tipService.getTipValues()
  }
  onReset(){
    let data=this.tipService.data;
    if(data&&!Object.values(data!).some((e)=>e==null)&&this.tipService.showReset()){
      this.tipService.reset.set(true);
      this.tipService.showReset.set(false)
    }
  }
  get showReset(){
    return this.tipService.showReset()
  }
}

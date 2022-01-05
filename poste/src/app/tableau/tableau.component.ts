import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  private inputs: any;
  private outputs: any;

  constructor() { }

  ngOnInit(): void {
  }
  addinput(): void{
    this.inputs.push({'nom' :'', 'type': '', 'obligatoire': false})
  }
  removeinput(i: any){
    this.inputs.splice(i,1);
  }
  addoutput(): void{
    this.outputs.push({'nom' :'', 'type': '', 'obligatoire': false})
  }
  removeoutput(i: any){
    this.outputs.splice(i,1);

}}



import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detallenotasc',
  templateUrl: './detallenotasc.page.html',
  styleUrls: ['./detallenotasc.page.scss'],
})
export class DetallenotascPage implements OnInit {
  @Input() name:any;
  constructor() { }

  ngOnInit() {

    console.log(this.name)
  }

}

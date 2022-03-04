import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <p>
      movies-deatils works!
    </p>
  `,
  styles: [`
  * {
    color:white;
  }
  `
  ]
})
export class MoviesDetailsPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

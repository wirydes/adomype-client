import { OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class BaseComponent implements OnInit, OnDestroy {

  onSubscribe: Subscription[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.onSubscribe.forEach(item => {
      item.unsubscribe();
    });
  }

}

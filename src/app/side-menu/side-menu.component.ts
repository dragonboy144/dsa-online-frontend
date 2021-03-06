import {Component, Input} from '@angular/core';
import {CustomMenuItem} from "../menu/menu.service";
import {NavigationEnd, Router} from "@angular/router";
import {RoutingService} from "../shared/routing.service";
import {filter, take} from "rxjs/operators";
import {interval} from "rxjs";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {


  public current = '';
  @Input()
  public menuItems: CustomMenuItem[] = [];


  constructor(private router: Router, private routingService: RoutingService) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        let url = (<any>event).url;
        const idx = url.indexOf('?');
        if (idx !== -1) {
          url = url.substring(0, url.indexOf('?'));
        }

        this.current = url;
      });
  }

  public onItemClick(item: CustomMenuItem) {
    if (item.items) {
      if (!item.expanded) {
        item.expanded = true;
        item.items.forEach(entry => {
          entry.height = 0;
        });
        interval(10)
          .pipe(take(30))
          .subscribe(data => {
            item.items.forEach(entry => entry.height = (data + 1));
          });
      } else {
        interval(10)
          .pipe(take(30))
          .subscribe(data => {
            if(data === 29) {
              item.expanded = false;
            }
            item.items.forEach(entry => entry.height = 30 - (data + 1));
          });
      }
    } else {
      this.routingService.navigateByUrl(item.routerLink);
    }

  }


}

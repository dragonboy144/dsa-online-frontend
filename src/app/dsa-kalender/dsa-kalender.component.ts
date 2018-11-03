import {Component, OnDestroy, OnInit} from "@angular/core";
import {DsaDatum, KalendarTag, KalenderDaten, MONATE_DROPDOWN} from "./data";
import {KalenderService} from "./kalender.service";
import {SubjectSubscription} from "rxjs/internal/SubjectSubscription";
import {combineLatest, Subject, Subscription} from "rxjs/index";
import {GruppenService} from "../shared/gruppen.service";
import {SelectItem} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {RoutingService} from "../shared/routing.service";

@Component({
  selector: 'app-dsa-kalender',
  templateUrl: './dsa-kalender.component.html',
  styleUrls: ['./dsa-kalender.component.css'],
  providers: []
})
export class DsaKalenderComponent implements OnInit, OnDestroy {


  public heute: DsaDatum = new DsaDatum(1015, 3, 4);

  public monat: KalenderDaten;

  private heuteChanged = new Subject<DsaDatum>();
  private sub: Subscription;

  constructor(private kalenderService: KalenderService, private gruppenService: GruppenService, private route: ActivatedRoute,
              private router: RoutingService) { }

  ngOnInit() {
    this.sub = combineLatest(this.gruppenService.getCurrentGroup(), this.heuteChanged.asObservable())
      .subscribe(([gruppe, heute]) => {
        this.kalenderService.buildMonth(heute, gruppe.id)
          .subscribe(data => this.monat = data);
      });
    this.route.queryParams.subscribe(params => {
      if (params.date) {
        this.heute = this.kalenderService.toDsaDatum(params.date);
      }
      this.buildMonth();
    });

  }

  naechsterMonat() {
    this.heute.naechsterMonat()
    this.buildMonth();

  }

  letzterMonat() {
    this.heute.letzterMonat();
    this.buildMonth();
  }

  onDayClick(tag: KalendarTag) {
    if(tag.disabled) {
      return;
    }
    if (tag.inMonat) {
      this.heute = new DsaDatum(this.heute.jahr, this.heute.monatValue, tag.tag);
    } else {

      if (tag.relativerMonat === 1 ) {
        this.heute.naechsterMonat();

      } else {
        this.heute.letzterMonat();
      }
      this.heute.tag = tag.tag;
    }

    this.buildMonth();
  }

  onJahrChange() {
    this.buildMonth();
  }

  private buildMonth() {
    this.heuteChanged.next(this.heute);

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get monate(): SelectItem[] {
    return MONATE_DROPDOWN;
  }

  onEventClick($event, event) {
    $event.stopPropagation();
    if(event.type === 'ABENTEUER') {
      this.router.navigateByUrl(`/abenteuer/${event.id}`);
    }
    return false;
  }
}

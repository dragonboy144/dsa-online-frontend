import {Component, OnDestroy, OnInit} from '@angular/core';
import {Asset} from "../../shared/abenteuer/asset.service";
import {Kampf} from "../kampf.service";
import {GruppeInfo, GruppenService} from "../../shared/gruppen.service";

@Component({
  selector: 'app-kampf-erstellen',
  templateUrl: './kampf-erstellen.component.html',
  styleUrls: ['./kampf-erstellen.component.css']
})
export class KampfErstellenComponent implements OnInit, OnDestroy {


  public kampf: Kampf
  public teilnehmerChange;

  public sub;
  public gruppe: GruppeInfo;
  constructor(private gruppenService: GruppenService) { }

  ngOnInit() {
    this.sub = this.gruppenService.getCurrentGroup()
      .subscribe(gruppe => {
        this.gruppe = gruppe;
      })
  }

  onAssetSelection(asset:Asset) {
    if(asset) {
      this.kampf = {
        gegner: [],
        gruppe: this.gruppe.id,
        image: asset.filename

      }
    } else {
      this.kampf = undefined;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
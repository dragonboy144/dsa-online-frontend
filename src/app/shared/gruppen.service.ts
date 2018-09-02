import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {RestService} from '../service/rest/rest.service';
import {SelectItem} from 'primeng/api';
import {HeldenInfo} from '../meine-helden/helden.service';

@Injectable()
export class GruppenService {

  private currentGroup = new ReplaySubject<any>();
  private groups = new ReplaySubject<any>();
  private meisterGroups = new ReplaySubject<any>();
  constructor(private restService: RestService) {
    this.getGruppen(true)
      .subscribe(data => this.groups.next(data));
    this.getMeisterGruppen()
      .subscribe(data => this.meisterGroups.next(data));
  }


  public getGruppen(appendMeisterInfo?: boolean): Observable<SelectItem[]> {
    let url = 'gruppen';
    if (appendMeisterInfo) {
      url += '?meisterinfo=' + appendMeisterInfo;
    }
    return this.restService.get(url);
  }

  public getMeisterGruppen(): Observable<SelectItem[]> {
    return this.restService.get('gruppen/bymeister');
  }

  public getAllGruppenWhereCurrentUserCanEditMeister(): Observable<SelectItem[]> {
    return this.restService.get('gruppen/editable/meister');
  }

  public getGruppenIncludingHeld(publicOnly: boolean, showInactive: boolean): Observable<GruppeIncludingHeld[]> {
    return this.restService.get(`gruppen/includeHelden?publicOnly=${publicOnly}&showInactive=${showInactive}`);
  }

  public getGruppeIncludingHeld(gruppeid: number, publicOnly: boolean, showInactive: boolean): Observable<GruppeIncludingHeld> {
    return this.restService.get(`gruppen/${gruppeid}/includeHelden?publicOnly=${publicOnly}&showInactive=${showInactive}`);
  }


  public updateGruppe(heldid: number, gruppeid: number): Observable<void> {
    return this.restService.post('gruppen/' + heldid + '/' + gruppeid, null);
  }

  public getHeldenForGruppe(gruppeid: number ): Observable<any> {
    return this.restService.get('gruppen/helden/' + gruppeid);
  }

  public getGroups() {
    return this.groups.asObservable();
  }

  public getMeisterGroups() {
    return this.meisterGroups.asObservable();
  }

  public getCurrentGroup() {
    return this.currentGroup.asObservable();
  }

  public setCurrentGroup(group) {
    this.currentGroup.next(group);
  }
}

export interface GruppeIncludingHeld {
  name: string;
  id: number;
  helden: HeldenInfo[];
}
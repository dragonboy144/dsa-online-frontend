import {NgModule} from "@angular/core";
import {HeldVergleichComponent} from "./held-vergleich/held-vergleich.component";
import {HeldUebersichtComponent} from "./held-uebersicht/held-uebersicht.component";
import {HeldEreignisseComponent} from "./held-ereignisse/held-ereignisse.component";
import {HeldGeldComponent} from "./held-geld/held-geld.component";
import {HeldInventarComponent} from "./held-inventar/held-inventar.component";
import {HeldMobilComponent} from "./held-mobil/held-mobil.component";
import {HeldQuicknavComponent} from "./held-quicknav/held-quicknav.component";
import {HeldSteigernComponent} from "./held-steigern/held-steigern.component";
import {HeldTalenteComponent} from "./held-talente/held-talente.component";
import {HeldZauberComponent} from "./held-zauber/held-zauber.component";
import {HeldGeldService} from "./held-geld/held-geld.service";
import {HeldMobilService} from "./held-mobil/held-mobil.service";
import {HeldenService} from "../meine-helden/helden.service";
import {CardModule} from "primeng/card";
import {CommonModule} from "@angular/common";
import {TableModule} from "primeng/table";
import {
  AccordionModule,
  ButtonModule,
  CheckboxModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  InputSwitchModule,
  MenuModule
} from "primeng/primeng";
import {PdfComponent} from "../shared/pdf/pdf.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {EreignisseTabelleComponent} from "../shared/tables/ereignisse-tabelle/ereignisse-tabelle.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FavoritenTabelleComponent} from "../shared/tables/favoriten-tabelle/favoriten-tabelle.component";
import {TalenteTabelleComponent} from "../shared/tables/talente-tabelle/talente-tabelle.component";
import {ZauberTabelleComponent} from "../shared/tables/zauber-tabelle/zauber-tabelle.component";

@NgModule({

  imports: [CardModule, CommonModule, TableModule, AccordionModule, PdfViewerModule, ReactiveFormsModule, DropdownModule, FormsModule,
    CheckboxModule, ButtonModule, InputSwitchModule, MenuModule, DialogModule, FileUploadModule],
  declarations: [HeldVergleichComponent, HeldUebersichtComponent, HeldEreignisseComponent, HeldGeldComponent, HeldInventarComponent
  ,HeldMobilComponent, HeldQuicknavComponent, HeldSteigernComponent, HeldTalenteComponent, HeldZauberComponent, PdfComponent,
    EreignisseTabelleComponent, FavoritenTabelleComponent, TalenteTabelleComponent, ZauberTabelleComponent],
  providers: [HeldGeldService, HeldMobilService, HeldenService ]
})
export class HeldModule {

}

import { InteractionService } from './../../services/interaction.service';
import { Spot } from './../../models/spot';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  spot: Spot;
  private classificacaoColors = ['success', 'warning', 'danger']
  private classificacaoLabels = ['-20min', 'de 20 a 40min', '+40min']

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    public intServ: InteractionService,
  ) { }

  ngOnInit() {
    this.spot = this.navParams.get('spot')
  }

  comoChegar(type: 'waze' | 'maps') {
    const open = (opt) => () => {
      const wazeNavigationUrl = `https://www.waze.com/ul?ll=${this.spot.coords[0]}%2C${this.spot.coords[1]}&navigate=yes&zoom=17`;
      const googleMapsRoutesUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.spot.coords[0]},%20${this.spot.coords[1]}&travelmode=${opt}`;
      if (type) {
        const url = type && type == 'waze' ? wazeNavigationUrl : googleMapsRoutesUrl;
        console.log(url)
        window.open(url, '_blank', 'location=yes')
      }
    }
    if (type == "maps") {
      this.intServ.presentGenericAlert({
        subHeader: 'qual meio de transporte você tem disponível?',
        inputs: [{
          name: 'opt1',
          type: 'radio',
          label: 'A pé',
          value: 'walking',
        }, {
          name: 'opt2',
          type: 'radio',
          label: 'Bicicleta',
          value: 'bicycling',
        }, {
          name: 'opt3',
          type: 'radio',
          label: 'Ônibus',
          value: 'transit',
          checked: true
        }, {
          name: 'opt4',
          type: 'radio',
          label: 'Carro de passeio',
          value: 'driving',
        }],
        buttons: [{
          text: 'cancelar',
          role: 'cancel'
        }, {
          text: 'abrir',
          handler: (opt) => open(opt)()
        }]
      })
    } else {
      open(undefined)();
    }
  }

  close(id?: number) {
    this.modalController.dismiss(id);
  }

  get classificacaoColor(): string {
    return this.classificacaoColors[this.spot.indicador];
  }

  get classificacaoLabel(): string {
    return this.classificacaoLabels[this.spot.indicador];
  }

}

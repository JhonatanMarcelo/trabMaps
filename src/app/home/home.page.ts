import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ILocal } from '../interfaces/iLocal';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  posicaoAtual: any;

  public listalocais: ILocal[] = [
    {
      lat: -22.491817, 
      lng: -48.552246,
      titulo: 'Q-Tal Pizzaria'
    },
     
    {
      lat: -22.492831, 
      lng: -48.554221,
      titulo: 'Epa Lanches'
    },
    {
      lat: -22.489240, 
      lng: -48.546406,
      titulo: 'Etec - Naval'
    },
    {
      lat: -22.489704, 
      lng: -48.545333,
      titulo: 'Campo Bota-fogo'
    },
    {
      lat: -22.491735, 
      lng: -48.550064,
      titulo: 'Cooperbarra'
    },
  ]

  @ViewChild('map', {read: ElementRef, static:false}) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async showMap(){
    //const location = new google.maps.LatLng(-22.490388,-48.545540); posição fixa

    await this.buscaPosicao();

    const options = {
      center: this.posicaoAtual,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)

    const marcador = new google.maps.Marker({
      position: this.posicaoAtual,
      map: this.map,
      title: "Minha localização",
      icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      animation: google.maps.Animation.BOUNCE
    });
    for(let  local of this.listalocais){
      this.adicionarMarcador(local);
    }

  }

  ionViewDidEnter(){
    this.showMap();
  }

  private adicionarMarcador(Local: ILocal){
    const { lat, lng, titulo } = Local;

    const marcador = new google.maps.Marker({
      position: {lat, lng},

      map: this.map,
      title: titulo
      
    });
  }

  public async buscaPosicao(){
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
      this.posicaoAtual = {
        lat:posicaoGPS.coords.latitude,
        lng:posicaoGPS.coords.longitude
      }

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}

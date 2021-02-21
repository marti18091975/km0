import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import Map from 'ol/Map';
import 'ol/ol.css';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Size from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import  OSM  from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import Select from 'ol/interaction/Select';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate.js';
import { toLonLat } from 'ol/proj.js';
import {
  defaults as defaultControls,
  Control
} from 'ol/control';

import { ObjectUnsubscribedError, Observable,Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Header } from './../../models/header.model';

import * as actions from './../../actions';
import { AppState } from './../../app.reducers';
import { User } from './../../models/user.model';
import {Product} from './../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { FirebaseStorageService } from '../../firebase-storage.service';
import { Update } from '@ngrx/entity';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'ol/interaction';
import swal from "sweetalert";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [AuthService],
})
export class MainComponent implements OnInit, AfterViewInit,OnDestroy {
  public lat: number;
  public lon: number;
  
  public isIntro: boolean;
  private mapEl: HTMLElement;
  public email: string;
  public user: User;
  public userX: User;
  public error: boolean = null;
  public products:Product[]=[]
  public map1:Map;
  public producerEmail:String;
  public select:any=null;
  public featureId:any=null;
  public overlay:any=null;
  public coordinateSubscription:Subscription;
  
  public userSubscription:Subscription;
  public productSubscription:Subscription;
  public productFilterSubscription:Subscription;
  public productsFiltered:Product[]=[];
  public vectorSource:VectorSource;
  public zoom:any;
  
  constructor(
    private authSvc: AuthService,
    private elementRef: ElementRef,
    private router: Router,
    private store: Store<AppState> //private firebaseStorage: FirebaseStorageService
  ) {
    this.store.dispatch(actions.HydeHeader({ isShown: true }));
    this.user = {
      _id: null,
      name: null,
      email: null,
      lat:null,
      lon:null,      
      city: null,
      street: '',
      number: 0,
      phone: null,
      presentation:null,
      urlImage: null,
    };
    this.producerEmail=null;
    
    
  }

  async ngOnInit() {
    this.productFilterSubscription=this.store.select('productsFiltered').subscribe(({productsFiltered})=>{
      this.productsFiltered=productsFiltered;
      setTimeout(()=>{
        this.productFilterSubscription.unsubscribe();
      })
          
    })
    this.email = await this.authSvc.getCurrentUser().email;
    if (this.email) {
      this.store.dispatch(actions.get_user_by_email({ email: this.email }));
      
      this.userSubscription=this.store.select('user').subscribe(({ user }) => {
        setTimeout(()=>{
          this.userSubscription.unsubscribe();
        },500)
        this.user = user;
        
          this.error=false;
        
          if(this.user){
            if (this.user.number===null)this.user.number=0;
            this.store.dispatch(actions.getCoordinates({city:this.user.city,street:this.user.street,number:this.user.number}));
            setTimeout(() => {
            this.coordinateSubscription=this.store.select('coordinates').subscribe(({coordinates})=>{
              console.log('coordinates',coordinates);
              this.unsubscriber();
              if(!coordinates || coordinates.length===0){
                
                swal('dades incorrectes',"el nom del municipi, del carrer y/o el número són incorrectes, modifica'ls a edició de perfil",'error');
              }
              else{
                this.lat=coordinates[0].lat;
                this.lon=coordinates[0].lon;
                this.store.dispatch(actions.getProductsByCity({city:this.user.city}));
              this.zoom=15;
              this.map1.getView().setCenter(olProj.transform([this.lon,this.lat],'EPSG:4326', 'EPSG:3857'));
              this.map1.getView().setZoom(this.zoom);
              
              this.productSubscription=this.store.select('product').subscribe(({ products }) => {
                
                this.productsFiltered?this.products=this.productsFiltered:this.products=products;
                
                for(let n in this.products){
                  const point=new Point(olProj.fromLonLat([0, 0]));
                  point.setCoordinates(olProj.fromLonLat([this.products[n].producerLongitude, this.products[n].producerLatitude]));
                            
                  const marker=new Feature({
                    geometry: point,
                    population:4000,
                    rainfall:500
                  });
                  let iconType=null;
                  let scale=null;
                  switch(this.products[n].type){
                    case'fruites i verdures':
                          iconType="../../../assets/healthy-food.svg";
                          scale=0.04;
                          break;
                    case'lactics': 
                          iconType="../../../assets/milk-bottle.svg";
                          scale=0.04;
                          break;
                    case'begudes':
                          iconType="../../../assets/liquor.svg";
                          scale=0.06;
                          break;
                    case'olis':
                          iconType="../../../assets/petroleo.svg";
                          scale=0.06;
                          break;
                    case 'carns':
                          iconType="../../../assets/carne.svg";
                          scale=0.06;
                          break;
                    case 'artesania':
                          iconType="../../../assets/hilo.svg";
                          scale=0.06;
                          break;
                    case 'altres':
                          iconType="../../../assets/placeholder.png";
                          scale=0.06;
                          break;
                    default:
                          iconType="../../../assets/placeholder.png";
                          scale=0.06;
                  }
                 
                  marker.setId(this.products[n].producerEmail);
                marker.setStyle(new Style({
                image: new Icon({
                  anchor:[0.2,0.5],
                  
                  scale:scale,
                  imgSize:[700,700],
                 
                  src: iconType 
                }),
              }));
              this.vectorSource=new VectorSource({
                features: [marker]
              })
              const vectorLayer=new VectorLayer({
                source: this.vectorSource,
              })
              this.map1.addLayer(vectorLayer);
            }
                
              });
            }
          })
          },2000);
          }
          
        
      },(error)=>{
        this.error = true;
      });
    }else{
      swal('sense conexió','sembla que no podem connectar amb el servidor','error');
    }
    const container=document.getElementById('popup');
    const contentName=document.getElementById('popup-content__name');
    const contentSubName=document.getElementById('popup-content__subName');
    const contentProducer=document.getElementById('popup-content__producer');
    const contentImg=document.getElementById('popup-content__img');
    const closer=document.getElementById('popup-closer');
    this.overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    
    
    this.map1 = new Map({
      target: 'map1',
      
      layers: [
        new TileLayer({
          source: new OSM()
        }),
       
      ],
      overlays:[this.overlay],
      view: new View({
        center: olProj.fromLonLat([0, 0]),
        zoom: this.zoom
      }),
      interactions:defaultInteractions().extend([new DragRotateAndZoom()]),
      controls: defaultControls({
        attributionOptions: {
          collapsible: true
        }
      }).extend([])
    });
    
    this.map1.on('singleclick', (evt: any)=>{
      this.overlay.setPosition(undefined);
      this.map1.forEachFeatureAtPixel(evt.pixel,(feature,layer)=>{
        this.featureId=feature.getId();
        console.log("feature",this.featureId);
        let nameProducer=null;
        let productName=null;
        let productSubName=null;
        let productUrl=null;
        if(this.products.length!=0){
          for(let n in this.products){
            if(this.products[n].producerEmail===this.featureId){
              nameProducer=this.products[n].producerName;
              productName=this.products[n].name;
              productSubName=this.products[n].subName;
              productUrl=this.products[n].urlImage;
            }
          }
        }
        
        const coordinate = evt.coordinate;
        document.getElementById('popup-content__name').innerHTML = productName;
        if(productSubName)contentSubName.innerHTML = productSubName;
        contentProducer.innerHTML = nameProducer;
        if(productUrl){
        contentImg.setAttribute('src',productUrl);
        }else{
          contentImg.setAttribute('src',"https://www.flaticon.es/svg/static/icons/svg/1043/1043940.svg"); 
        }
      this.overlay.setPosition(coordinate);
      })
    });
  }
  ngAfterViewInit() {
    this.mapEl = this.elementRef.nativeElement.querySelector('#map1' );
    this.setSize();
    
    setTimeout(() => {
      if (this.error) {
        let userX: User = {
          email: this.email,
          _id: null,
          name: null,
          lat:0,
          lon:0,          
          city: null,
          street: null,
          number: null,
          phone: null,
          urlImage: null,
          presentation:null
        };

        this.store.dispatch(actions.createUser({ user: userX }));
      }
    }, 500);  
  }
  private setSize(): void {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height =  '501px';
     // styles.width =  '800px';
    }
  }
  getProducts(){
    this.router.navigate(['/productsList']);
  }
  
  visitProducer(){
    this.overlay.setPosition(null);
    setTimeout(() => {
    if(this.featureId){
      this.producerEmail=this.featureId;
    }
  },500);
  
  
  }
  unsubscriber(){
    setTimeout(() => {
      this.coordinateSubscription.unsubscribe();
    })
  }
  ngOnDestroy() {
    if(this.coordinateSubscription){
      this.coordinateSubscription.unsubscribe();}
    if(this.userSubscription){
      this.userSubscription.unsubscribe();}
    if(this.productSubscription){
      this.productSubscription.unsubscribe();}
      if(this.productFilterSubscription){
        this.productFilterSubscription.unsubscribe();}
  }
}
  

const cssUnitsPattern = /([A-Za-z%]+)$/;
function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}



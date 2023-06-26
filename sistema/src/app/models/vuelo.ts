export class Vuelo {
  _id?: number;
  avion: any;
  destination:string;
  flightNumber: string;
  miembros: any;
  time: string
  origin: string;
  piloto: any;


  constructor(code:string, flightNumber:string, time: string, destination:string, origen: string, destino:string, hora:number, avion:string, piloto:any, miembros:any ){
      this.flightNumber = flightNumber;
      this.destination = destination;
      this.origin = origen;
      this.time = time
      this.piloto = destino;
      this.avion = avion;
      this.miembros = miembros;

  }
}

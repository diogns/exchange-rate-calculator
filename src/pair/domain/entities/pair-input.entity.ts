export class PairInputEntity {
  monto: number;
  monedaOrigen: string;
  monedaDestino: string;

  constructor(monto: number, monedaOrigen: string, monedaDestino: string) {
    this.monto = monto;
    this.monedaOrigen = monedaOrigen;
    this.monedaDestino = monedaDestino;
  }
}

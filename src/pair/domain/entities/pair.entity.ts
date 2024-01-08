export class PairEntity {
  pair: string;
  convertion: number;

  constructor(
    pair: string,
    convertion: number,
  ) {
    this.pair = pair;
    this.convertion = convertion;
  }
}

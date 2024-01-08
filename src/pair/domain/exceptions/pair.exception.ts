import { NotFoundException } from '@nestjs/common';

export class PairNotFoundException extends NotFoundException {
  constructor() {
    super(PairNotFoundException.getMessage());
  }
  static getMessage() {
    return 'Pair was not found in database';
  }
}

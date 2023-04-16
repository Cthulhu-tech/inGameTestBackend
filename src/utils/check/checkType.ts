import { HttpException, HttpStatus } from '@nestjs/common';

export class CheckType {
  public checkType<T>(array: Array<T>, type: string, field: string) {
    const typeSet = new Set(array.map((x) => typeof x));
    if (typeSet.size > 1 || typeof array[0] !== `${type}`)
      throw new HttpException(
        'All fields must be of data type ' +
          type.toUpperCase() +
          '. Field: ' +
          field,
        HttpStatus.BAD_REQUEST,
      );
  }
}

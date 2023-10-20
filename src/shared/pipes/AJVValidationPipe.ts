import addFormats from 'ajv-formats';
import {
  BadRequestException,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvKeyword from 'ajv-keywords';
import { REGEX_HH_COLON_MM } from '@constants/constant';

const HHmmFormat = {
  validate: new RegExp(REGEX_HH_COLON_MM),
  compare: (data1: string, data2: string) => {
    return data1 > data2 ? 1 : data1 === data2 ? 0 : -1;
  },
};

@Injectable({ scope: Scope.REQUEST })
export class AJVValidationPipe implements PipeTransform {
  private readonly AjvInstance = new Ajv({
    allErrors: true,
    $data: true,
  });
  constructor(private schema) {
    addFormats(this.AjvInstance);
    ajvErrors(this.AjvInstance);
    ajvKeyword(this.AjvInstance);
    this.AjvInstance.addFormat('HH:mm', HHmmFormat);
  }

  transform(value) {
    const isValid = this.AjvInstance.validate(this.schema, value);
    if (!isValid) {
      throw new BadRequestException({
        errors: this.AjvInstance.errors,
      });
    }
    return value;
  }
}

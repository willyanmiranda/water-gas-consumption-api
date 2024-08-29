import Joi from 'joi';

import { IMeasureType, MeasureType } from '@/types/Measure';
import RequestDTO from '@/entities/RequestDTO';

export interface IUploadRequestDTO {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: IMeasureType;
}

export default class UploadRequestDTO extends RequestDTO<IUploadRequestDTO> {
  
  validate(data: unknown): data is IUploadRequestDTO {
    const schema = Joi.object({
      image: Joi.string().base64().required(),
      customer_code: Joi.string().required(),
      measure_datetime: Joi.date().required(),
      measure_type: Joi.string().valid(...MeasureType).insensitive().required()
    }).required();

    this.assign(schema.validate(data));

    return !this.error;
  }
}
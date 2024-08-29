import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';
import { IMeasureType } from '@/types/Measure';

export interface IListMeasureRequestDTO {
  customer_code: string;
  measure_type?: IMeasureType;
}

export default class ListMeasureRequestDTO extends RequestDTO<IListMeasureRequestDTO> {
  
  validate(data: unknown): data is IListMeasureRequestDTO {
    const schema = Joi.object({
      customer_code: Joi.string().required(),
      measure_type: Joi.string()
      // measure_type: Joi.string().valid(...MeasureType).insensitive()
    }).required();
    
    this.assign(schema.validate(data));
    
    return !this.error;
  }
}
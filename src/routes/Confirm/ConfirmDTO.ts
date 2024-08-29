import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface IConfirmRequestDTO {
  measure_uuid: string;
  confirmed_value: number;
}

export default class ConfirmRequestDTO extends RequestDTO<IConfirmRequestDTO> {
  
  validate(data: unknown): data is IConfirmRequestDTO {
    const schema = Joi.object({
      measure_uuid: Joi.string().required(),
      confirmed_value: Joi.number().required()
    }).required();
    
    this.assign(schema.validate(data));
    
    return !this.error;
  }
}
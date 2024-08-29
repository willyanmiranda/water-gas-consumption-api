import { IMeasureRepository } from '@/repositories/MeasureRepository';
import { FormattedFastifyError } from '@/utils/handleFastifyError';

import { IListMeasureRequestDTO } from './ListMeasureDTO';

export default class ListMeasureUseCase {
  constructor(
    private measureRepository: IMeasureRepository
  ) {}

  async execute(data: IListMeasureRequestDTO) {

    const measures = await this.measureRepository.listByCustomerCode({
      customer_code: data.customer_code,
      measure_type: data.measure_type
    });

    if(measures.length===0)
      throw new FormattedFastifyError({
        error: 'Unable to listMeasure',
        error_code: 'MEASURES_NOT_FOUND',
        description: 'Nenhuma leitura encontrada',
        status: 404
      });

    return {
      customer_code: data.customer_code,
      measures
    };

  }
}
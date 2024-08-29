import { RouteOptions } from 'fastify';

import handleFastifyError, { FormattedFastifyError } from '@/utils/handleFastifyError';
import parseFastifyRequestProp from '@/utils/parseFastifyRequestProp';
import { PrismaMeasureRepository } from '@/repositories/implementations/PrismaMeasureRepository';
import { MeasureType } from '@/types/Measure';

import ListMeasureRequestDTO from './ListMeasureDTO';
import ListMeasureUseCase from './ListMeasureUseCase';

const ListMeasureController: RouteOptions = {
  method: 'GET',
  url: '/:customer_code/list',
  handler: async (req, reply) => {
    try {

      const body = {
        customer_code: parseFastifyRequestProp(req.params, 'customer_code'),
        measure_type: parseFastifyRequestProp(req.query, 'measure_type')
      }

      const dto = new ListMeasureRequestDTO();
      if(!dto.validate(body) || !dto.value)
        throw new FormattedFastifyError({
          error: 'Unable to listMeasure',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      if(body.measure_type && !MeasureType.includes(body.measure_type.toUpperCase()))
        throw new FormattedFastifyError({
          error: 'Unable to listMeasure',
          error_code: 'INVALID_DATA',
          description: 'Tipo de medição não permitida',
          status: 400
        });

      const prismaMeasureRepository = new PrismaMeasureRepository();
      const listMeasureUseCase = new ListMeasureUseCase(prismaMeasureRepository);
      const { customer_code, measures } = await listMeasureUseCase.execute(dto.value);

      reply.status(200).send({ customer_code, measures });

    } catch(error) {
      handleFastifyError({ error, reply });
    }
  }
}

export default ListMeasureController;
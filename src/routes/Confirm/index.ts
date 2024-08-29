import { RouteOptions } from 'fastify';

import handleFastifyError, { FormattedFastifyError } from '@/utils/handleFastifyError';
import { PrismaMeasureRepository } from '@/repositories/implementations/PrismaMeasureRepository';

import ConfirmRequestDTO from './ConfirmDTO';
import ConfirmUseCase from './ConfirmUseCase';

const ConfirmController: RouteOptions = {
  method: 'PATCH',
  url: '/confirm',
  handler: async (req, reply) => {
    try {

      const dto = new ConfirmRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw new FormattedFastifyError({
          error: 'Unable to confirm',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaMeasureRepository = new PrismaMeasureRepository();
      const confirmUseCase = new ConfirmUseCase(prismaMeasureRepository);
      await confirmUseCase.execute(dto.value);

      reply.status(200).send({ success: true });

    } catch(error) {
      handleFastifyError({ error, reply });
    }
  }
}

export default ConfirmController;
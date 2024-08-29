import catchThrowError from '@/tests/utils/catchThrowError';
import imageBase64JSON from '@/tests/data/imageBase64.json';
import { PrismaCustomerRepository } from '@/repositories/implementations/PrismaCustomerRepository';
import { PrismaMeasureRepository } from '@/repositories/implementations/PrismaMeasureRepository';
import { Customer } from '@/entities/Customer';

import ConfirmRequestDTO from './ConfirmDTO';
import UploadRequestDTO from '../Upload/UploadDTO';
import UploadUseCase from '../Upload/UploadUseCase';
import ConfirmUseCase from './ConfirmUseCase';

describe('Confirm', () => {

  const validImageBase64 = imageBase64JSON.validImageBase64;
  const prismaMeasureRepository = new PrismaMeasureRepository();
  const prismaCustomerRepository = new PrismaCustomerRepository();

  describe('DTO', () => {

    it('All properties are correct', () => {

      const dto = new ConfirmRequestDTO();
      dto.validate({
        measure_uuid: 'Random Code',
        confirmed_value: 10
      });

      expect(dto.error).toBeUndefined();

    });

    describe('Missing property', () => {

      it('measure_uuid', () => {

        const dto = new ConfirmRequestDTO();
        dto.validate({
          confirmed_value: 10
        });

        expect(dto.error).toBe("\"measure_uuid\" is required");

      });

      it('confirmed_value', () => {

        const dto = new ConfirmRequestDTO();
        dto.validate({
          measure_uuid: 'Random Code'
        });

        expect(dto.error).toBe("\"confirmed_value\" is required");

      });

    });

  });

  describe('UseCase', () => {

    it('Confirm successfully', async () => {

      const customer = new Customer();

      const uploadDTO = new UploadRequestDTO();
      uploadDTO.validate({
        image: validImageBase64.water,
        customer_code: customer.customer_code,
        measure_datetime: new Date(),
        measure_type: 'Water'
      });

      expect(uploadDTO.error).toBeUndefined();
      if(uploadDTO.value) {

        const uploadUseCase = new UploadUseCase(prismaMeasureRepository, prismaCustomerRepository);
        const { measure_uuid } = await uploadUseCase.execute(uploadDTO.value);

        const confirmDTO = new ConfirmRequestDTO();
        confirmDTO.validate({
          measure_uuid,
          confirmed_value: 100
        });

        expect(confirmDTO.error).toBeUndefined();
        if(confirmDTO.value) {

          const confirmUseCase = new ConfirmUseCase(prismaMeasureRepository);
          const result = await catchThrowError(async () => await confirmUseCase.execute(confirmDTO.value!));

          expect(result).toBeUndefined();

          const measure = await prismaMeasureRepository.findById({ measure_uuid });

          expect(measure).not.toBeNull();
          if(measure) {

            expect(measure.has_confirmed).toBe(true);

          }

        }

      }

    });

    it('Already confirmed', async () => {

      const customer = new Customer();

      const uploadDTO = new UploadRequestDTO();
      uploadDTO.validate({
        image: validImageBase64.water,
        customer_code: customer.customer_code,
        measure_datetime: new Date(),
        measure_type: 'Water'
      });

      expect(uploadDTO.error).toBeUndefined();
      if(uploadDTO.value) {

        const uploadUseCase = new UploadUseCase(prismaMeasureRepository, prismaCustomerRepository);
        const { measure_uuid } = await uploadUseCase.execute(uploadDTO.value);

        const confirmDTO = new ConfirmRequestDTO();
        confirmDTO.validate({
          measure_uuid,
          confirmed_value: 100
        });

        expect(confirmDTO.error).toBeUndefined();
        if(confirmDTO.value) {

          const confirmUseCase = new ConfirmUseCase(prismaMeasureRepository);
          await confirmUseCase.execute(confirmDTO.value);

          const result = await catchThrowError(async () => await confirmUseCase.execute(confirmDTO.value!));

          expect(result).toEqual({
            error: 'Unable to confirm',
            error_code: 'CONFIRMATION_DUPLICATE',
            description: 'Leitura do mês já realizada',
            status: 409
          });

        }

      }

    });

  });

});
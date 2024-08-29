import imageBase64JSON from '@/tests/data/imageBase64.json';
import { PrismaCustomerRepository } from '@/repositories/implementations/PrismaCustomerRepository';
import { PrismaMeasureRepository } from '@/repositories/implementations/PrismaMeasureRepository';
import { Customer } from '@/entities/Customer';

import ListMeasureRequestDTO from './ListMeasureDTO';
import UploadRequestDTO from '../Upload/UploadDTO';
import UploadUseCase from '../Upload/UploadUseCase';
import ListMeasureUseCase from './ListMeasureUseCase';

describe('ListMeasure', () => {
  
  const validImageBase64 = imageBase64JSON.validImageBase64;
  const prismaMeasureRepository = new PrismaMeasureRepository();
  const prismaCustomerRepository = new PrismaCustomerRepository();

  describe('DTO', () => {
    it('All properties are correct', () => {

      const dto = new ListMeasureRequestDTO();
      dto.validate({
        customer_code: 'Random Code',
        measure_type: 'Water'
      });

      expect(dto.error).toBeUndefined();

    });

    it('Test measure_type insensitive validation', () => {

      const dto = new ListMeasureRequestDTO();
      dto.validate({
        customer_code: 'Random Code',
        measure_type: 'WaTeR'
      });

      expect(dto.error).toBeUndefined();

    });

    describe('Missing property', () => {

      it('customer_code', () => {

        const dto = new ListMeasureRequestDTO();
        dto.validate({
          measure_type: 'Water'
        });

        expect(dto.error).toBe("\"customer_code\" is required");

      });

      it('measure_type', () => {

        const dto = new ListMeasureRequestDTO();
        dto.validate({
          customer_code: 'Random Code'
        });
  
        expect(dto.error).toBeUndefined();

      });

    });
  });

  describe('UseCase', () => {

    it('List unique measure', async () => {

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

        const listMeasureDTO = new ListMeasureRequestDTO();
        listMeasureDTO.validate({
          customer_code: customer.customer_code
        });
  
        expect(listMeasureDTO.error).toBeUndefined();
        if(listMeasureDTO.value) {
  
          const listMeasureUseCase = new ListMeasureUseCase(prismaMeasureRepository);
          const { measures } = await listMeasureUseCase.execute(listMeasureDTO.value);
  
          expect(measures[0].measure_uuid).toEqual(measure_uuid);
  
        }
      }

    });

    it('List only matches with measure_type', async () => {

      const customer = new Customer();

      const uploadDTOWater = new UploadRequestDTO();
      uploadDTOWater.validate({
        image: validImageBase64.water,
        customer_code: customer.customer_code,
        measure_datetime: new Date(),
        measure_type: 'Water'
      });

      const uploadDTOGas = new UploadRequestDTO();
      uploadDTOGas.validate({
        image: validImageBase64.water,
        customer_code: customer.customer_code,
        measure_datetime: new Date(),
        measure_type: 'Gas'
      });
      
      expect(uploadDTOWater.error).toBeUndefined();
      expect(uploadDTOGas.error).toBeUndefined();
      if(uploadDTOWater.value && uploadDTOGas.value) {

        const uploadUseCase = new UploadUseCase(prismaMeasureRepository, prismaCustomerRepository);
        const { measure_uuid } = await uploadUseCase.execute(uploadDTOWater.value);
        await uploadUseCase.execute(uploadDTOGas.value);

        const listMeasureDTO = new ListMeasureRequestDTO();
        listMeasureDTO.validate({
          customer_code: customer.customer_code,
          measure_type: 'Water'
        });
  
        expect(listMeasureDTO.error).toBeUndefined();
        if(listMeasureDTO.value) {
  
          const listMeasureUseCase = new ListMeasureUseCase(prismaMeasureRepository);
          const { measures } = await listMeasureUseCase.execute(listMeasureDTO.value);
  
          expect(measures.length).toEqual(1);
          expect(measures[0].measure_uuid).toEqual(measure_uuid);
  
        }
      }

    });

  });

});
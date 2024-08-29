import { FastifyReply } from 'fastify';

import colorout from './colorout';

export class FormattedFastifyError {
  
  public error: any;
  public error_code: string;
  public description: string;
  public status: number;

  constructor(props: FormattedFastifyError) {
    this.error = props.error;
    this.error_code = props.error_code;
    this.description = props.description;
    this.status = props.status;
  }

}

const NODE_ENV = process.env.NODE_ENV ?? 'production';

interface HandleFastifyErrorProps {
  error: any;
  reply: FastifyReply;
}
export default function handleFastifyError({
  error,
  reply
}: HandleFastifyErrorProps) {

  const date = new Date().toISOString();
  
  if(error instanceof FormattedFastifyError) {
    
    if(NODE_ENV==='development') {
      console.error(`[${colorout.fg.red}${date}${colorout.reset}]`);
      console.error(`[${colorout.fg.red}FULL ERROR${colorout.reset}]`);
      console.error(error);
      console.error(`[${colorout.fg.red}FORMATTED ERROR${colorout.reset}]`);
      console.error(`[${colorout.fg.red}MESSAGE${colorout.reset}]`);
      console.error(error.description);
      console.error(`[${colorout.fg.red}ERROR${colorout.reset}]`);
      console.error(error.error.stack ?error.error.stack :error.error);
    }

    reply.status(error.status).send({ error_code: error.error_code, error_description: error.description });

  } else if(error instanceof Error) {

    console.error(`[${colorout.fg.red}${date}${colorout.reset}]`);
    if(error.stack) {
      console.error(`[${colorout.fg.red}FULL ERROR${colorout.reset}]`);
      console.error(error);
    }
    console.error(`[${colorout.fg.red}INSTANCE ERROR${colorout.reset}]`);
    console.error(`[${colorout.fg.red}MESSAGE${colorout.reset}]`);
    console.error(error.message);
    console.error(`[${colorout.fg.red}ERROR${colorout.reset}]`);
    console.error(error.stack ?error.stack :error);

    reply.status(500).send({ error_code: 'INTERNAL_SERVER_ERROR', error_description: 'Ocorreu um erro inesperado' });

  } else {
    
    console.error(`[${colorout.fg.red}${date}${colorout.reset}]`);
    console.error(`[${colorout.fg.red}ANY ERROR${colorout.reset}]`);
    console.error(error);

    reply.status(500).send({ error_code: 'INTERNAL_SERVER_ERROR', error_description: 'Ocorreu um erro inesperado' });

  }

}
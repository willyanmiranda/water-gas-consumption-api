<div>
  <div align="center">
    <img src="./assets/shopper-logo.svg" />
  </div>
  
  <h2>Teste técnico para vaga de Desenvolvedor Full Stack na Shopper</h2>
</div>

**Teste:** Desenvolver o back-end de um serviço que gerencia a leitura individualizada de
consumo de água e gás. Utilizando IA para
obter a medição através da foto de um medidor.

<br/>

## Endpoints

**POST /upload**<br/>
> Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a medida lida pela API
- Request Body
```ts
{
  image: "base64",
  customer_code: "string",
  measure_datetime: "datetime",
  measure_type: "WATER" | "GAS"
}
```

**PATCH /confirm**<br/>
> Responsável por confirmar ou corrigir o valor lido pelo LLM
- Request Body
```ts
{
  measure_uuid: "string",
  confirmed_value: "integer"
}
```

> **Nota:** Durante o desenvolvimento, no erro `MEASURE_NOT_FOUND`, o teste solicitava que a `error_description` fosse 'Leitura do mês já realizada', o que me pareceu incoerente. Acredito que a descrição correta deveria ser 'Leitura não encontrada'. Não tenho certeza se houve algum equívoco na documentação, mas, por precaução, mantive a descrição 'Leitura do mês já realizada', caso seja uma questão proposital.



**GET /:customer_code/list**<br/>
> Responsável por listar as medidas realizadas por um determinado cliente

- Request Query *( /list?query=value )*
```ts
// opcional
measure_type: "WATER" | "GAS"
```

<br/>

## Instalação

```bash
git clone https://github.com/willyanmiranda/water-gas-consumption-api.git

cd water-gas-consumption-api
```

Crie um novo arquivo .env e coloque uma KEY do Gemini https://ai.google.dev/gemini-api/docs/api-key

```ts
// .env
GEMINI_API_KEY="KEY"
```

Inicie o container
```bash
docker compose up
# Aplicação rodando em localhost:3333
```

<br/>

## Tecnologias
- Docker
- TypeScript
- Node
- Prisma
- Jest
- Fastify
- Joi
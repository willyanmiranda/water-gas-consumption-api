import { randomUUID } from 'node:crypto';

export default class Measure {
  
  public measure_uuid: string;
  public measure_datetime: Date;
  public measure_type: string;
  public has_confirmed: boolean;
  public image_url: string;
  public customer_code: string;
  public value: number;

  constructor(props: Omit<Measure, 'measure_uuid'>, id?: string) {
    this.measure_uuid = id ?? randomUUID();
    this.measure_datetime = props.measure_datetime;
    this.measure_type = props.measure_type.toUpperCase();
    this.has_confirmed = props.has_confirmed;
    this.image_url = props.image_url;
    this.customer_code = props.customer_code;
    this.value = props.value;
  }

}
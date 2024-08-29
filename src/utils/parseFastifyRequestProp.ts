export default function parseFastifyRequestProp(data: unknown, key: string) {
  if(!data) return undefined;
  if(typeof data!=='object') return undefined;
  if(!(key in data)) return undefined;
  const temp: {[key: string]: any} = data;
  return temp[key];
}
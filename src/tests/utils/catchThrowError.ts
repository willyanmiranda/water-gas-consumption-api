export default async function catchThrowError(fn: Function) {
  try {
    await fn();
    return undefined;
  } catch(error) {
    return error;
  }
}
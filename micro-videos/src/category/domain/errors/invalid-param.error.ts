export default class InvalidParamError extends Error {
  constructor(message?: string) {
    super(message || 'Must pass name or description');
    this.name = 'InvalidParamError';
  }
}

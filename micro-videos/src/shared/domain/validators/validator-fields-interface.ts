export type FieldsErrors = {
  [fields:string]: string[]
}

export default interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
// eslint-disable-next-line semi
}

import { yup, IValidationMethod } from "@kaviar/validator-bundle";
import { Collection } from "@kaviar/mongo-bundle";
import { ContainerInstance, Constructor } from "@kaviar/core";
import "{{ validatorClassName }}.declarations";

export interface I{{ validatorClassName }}Config {
  message?: string;
}

export class {{ validatorClassName }}
implements IValidationMethod<I{{ validatorClassName }}Config> {
  parent = yup.{{ yupValidationType }}; // optional, defaults to yup.mixed, so to all
  name = "{{ validatorName }}";

  constructor(protected readonly container: ContainerInstance) {}

  async validate(
  value: any,
  config: I{{ validatorClassName }}Config,
  { createError, path }
  ) {
  // The 3d argument, the context, is properly described here:
  // https://github.com/jquense/yup#mixedtestname-string-message-string--function-test-function-schema

  let { message } = config;

  // Use the value to ensure this is valid
  // If you need other information

  createError(
  message || `You haven't implemented this validation logic`
  );
  }
  }
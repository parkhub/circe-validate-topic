/* @flow */

import defaultErrorThrower from './defaultErrorThrower';

type ValidateReturn = {|
  isValid: boolean,
  reason?: string
|};

type ValidateFunction = (Object | string) => ValidateReturn;

export type ValidatorCfg = {|
  topic: string,
  validate: ValidateFunction,
  onInvalid?: Object => void
|};

type ValidatorMapValue = {|
  validate: ValidateFunction,
  onInvalid?: Object => void
|};

export type ValidatorMap = Map<string, ValidatorMapValue>;

export default function createValidatorMap(validatorCfgs: ValidatorCfg[]): ValidatorMap {
  return validatorCfgs.reduce((vMap, validator) => {
    const { topic, validate, onInvalid = defaultErrorThrower } = validator;

    if (!validate || !topic) {
      const missingCfg = !validate ? 'validate' : 'topic';
      throw new Error(`Missing ${missingCfg} in validator configurations`);
    }

    vMap.set(topic, { validate, onInvalid });

    return vMap;
  }, new Map());
}

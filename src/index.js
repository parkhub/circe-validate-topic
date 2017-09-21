/* @flow */

/**
 * @module @parkhub/circe-validate-topic
 * @author Daniel Olivares
 */

import createValidatorsMap from './lib/createValidatorsMap';
import createValidateMiddleware from './lib/createValidateMiddleware';

import type { ValidatorCfg } from './lib/createValidatorsMap';
import type { ErrorHandler } from './lib/createValidateMiddleware';

type Message = string | Object;
type ObjectToValidate = {
  message: Message,
  topic: string
};

type ValidatorMiddleware = (ObjectToValidate, (ObjectToValidate) => void) => void;

type Configurations = {|
  validators: ValidatorCfg[],
  onTopicValidatorNotFound: ErrorHandler
|};

export default function validateTopic(validatorCfgs: Configurations): ValidatorMiddleware {
  const { validators, onTopicValidatorNotFound } = validatorCfgs;

  const validatorsMap = createValidatorsMap(validators);

  return createValidateMiddleware(validatorsMap, onTopicValidatorNotFound);
}

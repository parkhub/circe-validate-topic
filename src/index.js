/* @flow */

/**
 * @module @parkhub/circe-validate-topic
 * @author Daniel Olivares
 */

import createValidatorMap from './lib/createValidatorMap';
import createValidateMiddleware from './lib/createValidateMiddleware';

type Message = string | Object;
type ObjectToValidate = {
  message: Message,
  topic: string
};

type ValidatorMiddleware = (ObjectToValidate, (ObjectToValidate) => void) => void;

type ValidatorCfgs = {|
  topic: string,
  validate: (message: Message) => void,
  onInvalid: (message: Message) => void
|};

type Configurations = {|
  validators: ValidatorCfgs[],
  onTopicValidatorNotFound: ObjectToValidate => void
|};

export default function validateTopic(validatorCfgs: Configurations): ValidatorMiddleware {
  const { validators, onTopicValidatorNotFound } = validatorCfgs;

  const validatorsMap = createValidatorMap(validators);

  return createValidateMiddleware(validatorsMap, onTopicValidatorNotFound);
}

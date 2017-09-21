/* @flow */

import defaultErrorThrower from './defaultErrorThrower';
import type { ValidatorMap } from './createValidatorsMap';
import type { ErrorArguments } from './defaultErrorThrower';

const validateResultDefaultResponse = 'Validate function did not return a reason';

export type ErrorHandler = ErrorArguments => void;

type ValueToValidate = {
  topic: string,
  message: Object | string
};

type Next = any => void;

export default function createValidateMiddleware(
  validatorsMap: ValidatorMap,
  onTopicValidatorNotFound: ErrorHandler = defaultErrorThrower
) {
  return function validateMiddleware(valueToValidate: ValueToValidate, next: Next) {
    const { topic, message } = valueToValidate;
    const topicValidator = validatorsMap.get(topic);

    if (!topicValidator) {
      const topicValidatorMissing = 'Topic validator not found';

      return onTopicValidatorNotFound({
        topic,
        originalValue: valueToValidate,
        reason: topicValidatorMissing
      });
    }

    const { validate, onInvalid = defaultErrorThrower } = topicValidator;

    const validateResult = validate(message);

    const { isValid = false, reason = validateResultDefaultResponse } = validateResult || {};

    if (isValid) {
      return next(valueToValidate);
    }

    return onInvalid({
      topic,
      originalValue: valueToValidate,
      reason
    });
  };
}

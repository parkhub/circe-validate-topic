import defaultErrorThrower from './defaultErrorThrower';

const validateResultDefaultResponse = 'Validate function did not return a reason';

export default function createValidateMiddleware(
  validatorsMap,
  onTopicValidatorNotFound = defaultErrorThrower
) {
  return function validateMiddleware(valueToValidate, next) {
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

    return onInvalid({ topic, originalValue: valueToValidate, reason });
  };
}

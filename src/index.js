/* @flow */

/**
 * @module @parkhub/circe-validate-topic
 * @author Daniel Olivares
 */

type Message = string | Object;
type Validator = ({ topic: string, message: Message }) => void;
type ValidatorConfigurations = {|
  topic: string,
  validate: (message: Message) => void
|};

function createValidatorMap(validatorCfgs) {
  return validatorCfgs.reduce((vMap, validator) => {
    const { topic, validate } = validator;
    vMap.set(topic, validate);

    return vMap;
  }, new Map());
}

export default function validateTopic(validatorCfgs: ValidatorConfigurations[]): Validator {
  const validatorsMap = createValidatorMap(validatorCfgs);

  return ({ topic, message }) => {
    const validate = validatorsMap.get(topic);

    if (validate) {
      validate(message);
    }
  };
}

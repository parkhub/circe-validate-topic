import defaultErrorThrower from './defaultErrorThrower';

export default function createValidatorMap(validatorCfgs) {
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

import validateTopic from './';
import createValidatorsMap from './lib/createValidatorsMap';
import createValidateMiddleware from './lib/createValidateMiddleware';

jest.mock('./lib/createValidatorsMap');
jest.mock('./lib/createValidateMiddleware');

test('Should successfully validate a topic message', () => {
  const topic = 'TEST_TOPIC';
  const message = {
    topic,
    hello: 'hi'
  };

  const validate = jest.fn(() => ({ isValid: true }));
  const validatorCfgs = [
    {
      topic,
      validate
    }
  ];

  const next = jest.fn();

  const validator = validateTopic({ validators: validatorCfgs });

  const validateCfgs = { topic, message };
  validator(validateCfgs, next);

  expect(createValidatorsMap).toHaveBeenCalledWith(validatorCfgs);

  /* eslint-disable no-underscore-dangle */
  expect(createValidateMiddleware.__mocks__).toHaveBeenCalledWith(validateCfgs, next);
});

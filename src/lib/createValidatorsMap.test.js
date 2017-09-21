import createValidatorsMap from './createValidatorsMap';

test('Should throw if there are no validators configurations', () => {
  expect(() => createValidatorsMap()).toThrow();
});

test('Should throw if topic is missing for validators configurations', () => {
  const validatorCfgs = [
    {
      validate: jest.fn()
    }
  ];

  const expectedErr = 'Missing topic in validator configurations';
  expect(() => createValidatorsMap(validatorCfgs)).toThrow(new Error(expectedErr));
});

test('Should throw if validate function is missing for validators configurations', () => {
  const topic = 'TEST_TOPIC';
  const validatorCfgs = [
    {
      topic
    }
  ];

  const expectedErr = 'Missing validate in validator configurations';
  expect(() => createValidatorsMap(validatorCfgs)).toThrow(new Error(expectedErr));
});

test('Should create a validators map', () => {
  const topic = 'TEST_TOPIC';
  const validate = jest.fn();
  const validatorCfgs = [
    {
      topic,
      validate
    }
  ];

  const validatorsMap = createValidatorsMap(validatorCfgs);

  const expectedValidatorsMap = new Map();
  expectedValidatorsMap.set(topic, { validate });

  expect(validatorsMap).toEqual(expectedValidatorsMap);
});

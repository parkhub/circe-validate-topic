import createValidateMiddleware from './createValidateMiddleware';

test('Should successfully validate a topic message', () => {
  const topic = 'TEST_TOPIC';
  const message = {
    topic,
    hello: 'hi'
  };

  const validate = jest.fn(() => ({ isValid: true }));

  const next = jest.fn();

  const validatorsMap = new Map();
  validatorsMap.set(topic, { validate });

  const validator = createValidateMiddleware(validatorsMap);

  validator({ topic, message }, next);

  expect(validate).toHaveBeenCalledWith(message);
  expect(next).toHaveBeenCalledTimes(1);
});

test('Should call the default onInvalid that throws if none is configured w/default reason', () => {
  const topic = 'TEST_TOPIC';
  const message = {
    topic,
    hello: 'hi'
  };

  const validate = jest.fn();

  const validatorsMap = new Map();
  validatorsMap.set(topic, { validate });

  const validator = createValidateMiddleware(validatorsMap);
  const originalValue = {
    topic,
    message
  };

  const defaultReason = 'Validate function did not return a reason';
  const expectedError = new Error(
    `${topic} failed. Reason: ${defaultReason}. Original Value: ${JSON.stringify(
      originalValue,
      null,
      4
    )}`
  );
  const next = jest.fn();

  expect(() => validator(originalValue, next)).toThrow(expectedError);

  expect(validate).toHaveBeenCalledWith(message);
  expect(next).toHaveBeenCalledTimes(0);
});

test('Should call the default onInvalid that throws if none is configured', () => {
  const topic = 'TEST_TOPIC';
  const message = {
    topic,
    hello: 'hi'
  };

  const validate = jest.fn(() => ({ isValid: false, reason: 'IT JUST FAILS' }));

  const validatorsMap = new Map();
  validatorsMap.set(topic, { validate });

  const validator = createValidateMiddleware(validatorsMap);

  const originalValue = {
    topic,
    message
  };

  const expectedError = new Error(
    `${topic} failed. Reason: IT JUST FAILS. Original Value: ${JSON.stringify(
      originalValue,
      null,
      4
    )}`
  );
  const next = jest.fn();

  expect(() => validator(originalValue, next)).toThrow(expectedError);

  expect(validate).toHaveBeenCalledWith(message);
  expect(next).toHaveBeenCalledTimes(0);
});

test('Should call the onInvalid function when validation does not pass with default reason', () => {
  const topic = 'TEST_TOPIC';
  const message = {
    topic,
    hello: 'hi'
  };

  const validate = jest.fn(() => ({ isValid: false }));
  const onInvalid = jest.fn();

  const validatorsMap = new Map();
  validatorsMap.set(topic, { validate, onInvalid });

  const validator = createValidateMiddleware(validatorsMap);

  const next = jest.fn();

  validator({ topic, message }, next);

  expect(validate).toHaveBeenCalledWith(message);
  expect(onInvalid).toHaveBeenCalledWith({
    topic,
    originalValue: { topic, message },
    reason: 'Validate function did not return a reason'
  });
  expect(onInvalid).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledTimes(0);
});

test('Should call the onInvalid function when validation does not pass', () => {
  const topic = 'TEST_TOPIC';
  const message = {
    topic,
    hello: 'hi'
  };

  const validate = jest.fn(() => ({ isValid: false, reason: 'IT JUST FAILS' }));
  const onInvalid = jest.fn();

  const validatorsMap = new Map();
  validatorsMap.set(topic, { validate, onInvalid });

  const validator = createValidateMiddleware(validatorsMap);

  const next = jest.fn();

  validator({ topic, message }, next);

  expect(validate).toHaveBeenCalledWith(message);
  expect(onInvalid).toHaveBeenCalledWith({
    topic,
    originalValue: { topic, message },
    reason: 'IT JUST FAILS'
  });
  expect(onInvalid).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledTimes(0);
});

test('Should throw from default onTopicValidatorNotFound function if none is defined', () => {
  const topic = 'TEST_TOPIC';
  const notDefinedTopic = 'NOT_FOUND';
  const message = {
    topic: notDefinedTopic,
    hello: 'hi'
  };

  const validate = jest.fn(() => ({
    isValid: false
  }));
  const onInvalid = jest.fn();

  const validatorsMap = new Map();
  validatorsMap.set(topic, { validate, onInvalid });

  const validator = createValidateMiddleware(validatorsMap);

  const reason = 'Topic validator not found';
  const originalValue = {
    topic: notDefinedTopic,
    message
  };
  const expectedError = new Error(
    `${notDefinedTopic} failed. Reason: ${reason}. Original Value: ${JSON.stringify(
      originalValue,
      null,
      4
    )}`
  );

  const next = jest.fn();

  expect(() => validator(originalValue, next)).toThrow(expectedError);

  expect(validate).toHaveBeenCalledTimes(0);
  expect(onInvalid).toHaveBeenCalledTimes(0);
  expect(next).toHaveBeenCalledTimes(0);
});

test('Should call onTopicValidatorNotFound function if topic is not found', () => {
  const topic = 'TEST_TOPIC';
  const notDefinedTopic = 'NOT_FOUND';
  const message = {
    topic: notDefinedTopic,
    hello: 'hi'
  };

  const validate = jest.fn(() => ({
    isValid: false
  }));
  const onInvalid = jest.fn();
  const onTopicValidatorNotFound = jest.fn();

  const validatorsMap = new Map();
  validatorsMap.set(topic, { validate, onInvalid });

  const validator = createValidateMiddleware(validatorsMap, onTopicValidatorNotFound);

  const next = jest.fn();

  validator({ topic: notDefinedTopic, message }, next);

  expect(onTopicValidatorNotFound).toHaveBeenCalledTimes(1);
  expect(onTopicValidatorNotFound).toHaveBeenCalledWith({
    topic: notDefinedTopic,
    originalValue: { topic: notDefinedTopic, message },
    reason: 'Topic validator not found'
  });
  expect(validate).toHaveBeenCalledTimes(0);
  expect(onInvalid).toHaveBeenCalledTimes(0);
  expect(next).toHaveBeenCalledTimes(0);
});

import validateTopic from './';

test('Should validate a topic message', () => {
  const topic = 'TEST_TOPIC';
  const message = {
    topic,
    hello: 'hi'
  };

  const validate = jest.fn();
  const validatorCfgs = [
    {
      topic,
      validate
    }
  ];

  const validator = validateTopic(validatorCfgs);

  validator({ topic, message });

  expect(validate).toHaveBeenCalledWith(message);
});

test('Should do nothing if topic does not exist', () => {
  const topic = 'TEST_TOPIC';
  const message = {
    topic,
    hello: 'hi'
  };

  const validate = jest.fn();
  const validatorCfgs = [
    {
      topic,
      validate
    }
  ];

  const validator = validateTopic(validatorCfgs);

  validator({ topic: 'NO_EXIST', message });

  expect(validate).toHaveBeenCalledTimes(0);
});

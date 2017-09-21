import defaultErrorThrower from './defaultErrorThrower';

test('Should throw an error', () => {
  const topic = 'TEST_TOPIC';
  const originalValue = {
    test: 'hi'
  };
  const reason = 'NO REASON';

  const expectedErr = `${topic} failed. Reason: ${reason}. Original Value: ${JSON.stringify(
    originalValue,
    null,
    4
  )}`;

  const cfgs = {
    topic,
    originalValue,
    reason
  };

  expect(() => defaultErrorThrower(cfgs)).toThrow(new Error(expectedErr));
});

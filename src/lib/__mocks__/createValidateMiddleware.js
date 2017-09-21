const validator = jest.fn();
const createValidateMiddlewareMock = jest.fn(() => validator);

/* eslint-disable no-underscore-dangle */
createValidateMiddlewareMock.__mocks__ = validator;

export default createValidateMiddlewareMock;

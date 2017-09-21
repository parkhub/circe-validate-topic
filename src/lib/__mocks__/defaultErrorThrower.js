const defaultErrorThrowerMock = jest.fn(() => {
  throw new Error('ERROR!');
});

export default defaultErrorThrowerMock;

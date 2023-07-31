const mockedData = {
  time: { epoch: 1234567890 },
  metrics: 'Some metrics data',
};

export default {
  get: jest.fn((url) => {
    if (url === '/time') {
      return Promise.resolve({ status: 200, data: mockedData.time });
    } else if (url === '/metrics') {
      return Promise.resolve({ status: 200, data: mockedData.metrics });
    }
    return Promise.reject(new Error('Not Found'));
  }),
};

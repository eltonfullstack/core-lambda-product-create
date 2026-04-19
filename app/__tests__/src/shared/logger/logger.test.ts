describe('logger', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should create logger in local environment with pretty stream', () => {
    process.env.NODE_ENV = 'local';
    process.env.LOG_LEVEL = 'debug';

    const logger = require('../../../../src/shared/logger/logger').default;

    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('should create logger in non-local environment', () => {
    process.env.NODE_ENV = 'production';
    process.env.LOG_LEVEL = 'info';

    const logger = require('../../../../src/shared/logger/logger').default;

    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
  });
});
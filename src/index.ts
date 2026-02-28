// Re-export everything from the public API of shared-test-automation

export * from './PageObjects/index';
export * from './utils/index';
export * from './fixtures/index';

// Config helpers
export {mergePlaywrightConfig} from './utils/configHelpers';

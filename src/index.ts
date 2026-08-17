// Re-export everything from the public API of shared-test-automation

export * from './PageObjects/index.js';
export * from './utils/index.js';
export * from './fixtures/index.js';

// Config helpers
export {mergePlaywrightConfig} from './utils/configHelpers.js';

import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.test.ts',
  ],
}

export default config

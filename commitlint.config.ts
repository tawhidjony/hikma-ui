import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',     // New features
                'fix',      // Bug fixes
                'chore',    // Maintenance tasks
                'ci',       // CI/CD configuration changes
                'docs',     // Documentation updates
                'perf',     // Performance improvements
                'refactor', // Code refactoring
                'revert',   // Revert previous changes
                'style',    // Code style/formatting changes
                'test',     // Tests (add/update/remove)
                'build',    // Build system changes
                'deps'      // Dependencies updates
            ]
        ]
    }
};

export default Configuration;
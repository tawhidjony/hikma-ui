import type { UserConfig } from '@commitlint/types';

const Configuration:UserConfig = {
    extends:["@commitlint/config-conventional"],
    rules:  {
        'type-enum':[
            2,
            'always',
            [
                'feat',     // New features
                'fix',      // Bug Fixing
                'chore',    // Maintenance
                'ci',       // CI Configurations changes
                'docs',     // Documentions update
                'perf',     // Performance improvements
                'refactor', // Code Refactoring
                'revert',   // Revert to previous commit
                'style',    // Code Style change
                'test',     // Adding or updated tests
                
            ]
        ]
    }
}

module.exports = Configuration;
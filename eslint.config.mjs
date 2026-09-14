import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = [
    ...nextVitals,
    ...nextTs,
    {
        files: [
            'src/hooks/useAutoFetch.ts',
            'src/hooks/useInterval.ts',
            'src/store/useHydration.ts'
        ],
        rules: { 'react-hooks/set-state-in-effect': 'warn' }
    },
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts'
        ]
    }
]

export default eslintConfig

module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                cwd: 'babelrc',
                extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
                alias: {
                    '@app': './src/app',
                    '@assets': './src/assets',
                    '@constants': './src/constants',
                    '@components': './src/components',
                    '@store': './src/store',
                    '@screens': './src/screens',
                    '@services': './src/services',
                    '@shared': './src/interfaces',
                    '@interfaces': './src/interfaces',
                    '@types': './src/types',
                    '@hooks': './src/hooks',
                    '@helpers': './src/helpers',
                    '@navigation': './src/navigation',
                    '@functions': './src/functions',
                    '@utils': './src/utils'
                }
            }
        ],
        'jest-hoist',
        'react-native-reanimated/plugin'
    ]
};

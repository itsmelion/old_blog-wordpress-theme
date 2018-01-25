module.exports = {
    plugins: {
        'postcss-import': {},
        'autoprefixer': {},
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 5%'],
        },
        'cssnano': {}
    },
};
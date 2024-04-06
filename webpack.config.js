module.exports = {
    mode: "development",
    entry: {
        main: "./src/frontend/App.ts",
        user: "./src/frontend/userApp.ts"
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: '[name].chunk.js',
        path: __dirname + "/dist/frontend", // Thêm dấu "/" trước "dist/frontend"
        publicPath: "/assets/" // Xóa khoảng trắng dư thừa và thêm dấu "/" vào cuối
    },
    devtool: "source-map",
    resolve: { // Sửa "resovle" thành "resolve"
        extensions: [".ts", ".js", ".tsx"]
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/, // Loại bỏ khoảng trắng trong biểu thức chính quy
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        usedExports: true
    }
};
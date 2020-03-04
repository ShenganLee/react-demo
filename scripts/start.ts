import chalk from 'chalk';
import logSymbols from 'log-symbols';
import webpack from 'webpack';
import express from 'express';
import { prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';

import devConfig from './configs/webpack.dev';
import { HOST, PORT } from './utils/constants';
import setupMiddlewares from './middlewares';
import openBrowser from './utils/openBrowser';

async function start() {
    const urls = prepareUrls('http', HOST, PORT);
    const address = urls.localUrlForBrowser;
    const devServer = express();
    // 加载 webpack 配置，获取 compiler
    const compiler = webpack(devConfig);
    setupMiddlewares(devServer, compiler);
    openBrowser(compiler, address);

    const httpServer = devServer.listen(PORT, HOST, err => {
        if (err) {
            console.error(err);
            return;
        }
        // logSymbols.success 在 windows 平台渲染为 √ ，支持的平台会显示 ✔
        console.log(
            `DevServer is running at ${chalk.magenta.underline(address)} ${logSymbols.success}`,
        );
    });

    // 我们监听了 node 信号，所以使用 cross-env-shell 而不是 cross-env
    // 参考：https://github.com/kentcdodds/cross-env#cross-env-vs-cross-env-shell
    process.on('SIGINT', () => {
        // 先关闭 devServer
        httpServer.close();
    });
}

// 写过 python 的人应该不会陌生这种写法
// 判断这个模块是不是被直接运行的
if (require.main === module) {
    start();
}

import { Express } from 'express';
import chalk from 'chalk';
import { createProxyMiddleware } from 'http-proxy-middleware';

import proxyTable from '../configs/proxy';

function link(str: string) {
    return chalk.magenta.underline(str);
}

export default function proxyMiddleware(server: Express) {
    proxyTable.forEach(({ context, option }) => {
        const from = context.join('、');
        const to = option.target as string;
        console.log(`proxy ${chalk.magenta(from)} ${chalk.green('->')} ${link(to)}`);

        if (!option.logLevel) option.logLevel = 'warn';
        context.forEach(path => {
            server.use(path, createProxyMiddleware(option));
        });
    });
    process.stdout.write('\n');
}

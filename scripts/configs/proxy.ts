import { ProxyOption } from '../typings/devServer';

const proxyTable: ProxyOption[] = [
    {
        context: ['/path_to_be_proxy'],
        option: {
            target: 'http://target.domain.com',
            changeOrigin: true,
        },
    },
];

export default proxyTable;

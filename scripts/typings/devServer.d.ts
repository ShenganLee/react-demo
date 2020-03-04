import { Options } from 'http-proxy-middleware/dist/types';

export interface ProxyOption {
    context: string[];
    option: Options;
}

import path from 'path';
import { argv } from 'yargs';

const __DEV__ = process.env.NODE_ENV !== 'production';
const ENABLE_ANALYZE = !!argv.analyze;
const ENABLE_OPEN = !!argv.open;

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const COPYRIGHT = `/** @preserve Powered by react-demo (https://github.com/ShenganLee) */`;

const PROJECT_ROOT = path.resolve(__dirname, '../../');
const PROJECT_NAME = path.parse(PROJECT_ROOT).name;
const HMR_PATH = '/__webpack_hmr';

export {
    __DEV__,
    ENABLE_ANALYZE,
    HOST,
    PORT,
    COPYRIGHT,
    ENABLE_OPEN,
    PROJECT_NAME,
    PROJECT_ROOT,
    HMR_PATH,
};

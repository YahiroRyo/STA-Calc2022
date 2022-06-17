import { API_URL as PROD_API_URL } from '../env.production';
import { API_URL as LOCAL_API_URL } from '../env.local';

type Env = {
    API_URL: string
};

const envSetting = (): Env => {
    switch (location.hostname) {
        // prod
        case '':
            return {
                API_URL: PROD_API_URL
            };
        // local
        default:
            return {
                API_URL: LOCAL_API_URL
            };
    }
}

const env = envSetting();

export default env;
import axios from 'axios'
const _instance = axios.create({
    baseURL: 'https://api.douban.com/v2/movie/',
    // timeout: 5000
});

_instance.interceptors.request.use(
    config => {
        // `withCredentials` 表示跨域请求时是否需要使用凭证
        // config.withCredentials = false;
        // config.headers = {
        //   'Access-Control-Allow-Origin': '*'
        // };
        // config.params = {
        //   apikey: '0b2bdeda43b5688921839c8ecb20399b',
        //   city: '杭州',
        //   client: '',
        //   udid: ''
        // };
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

_instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error['response']) {
            return Promise.reject(error['response'].data);
        }
        return Promise.reject({ message: 'Server Error with 500!' });
    }
);

export default _instance;

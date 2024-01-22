// config.ts

interface EnvironmentConfig {
    mode: string;
    applicationId: string;
    mediaUrl: string;
    loginPageLink: string;
    getMedia: string;
    whatsappMediaUrl: string;
    basePath: (path: string) => string;
    username?: string;
    password?: string;
    CompanyId?: string;
    whatsappPartnerID?: string;
    // Diğer konfigürasyonları ekleyin...
}

const environment = process.env.NODE_ENV || 'dev'; // Default olarak 'dev' kullanılacaktır
console.log('environment', environment);

const config: Record<string, EnvironmentConfig> = {
    development: {
        mode: 'test',
        applicationId: '1',
        mediaUrl: 'http://logintest.meanderservices.com/assets',
        loginPageLink: 'http://loginpreview.meanderservices.com/',
        getMedia: 'http://10.10.22.13/assets/company/',
        whatsappMediaUrl: 'https://whatsappapi.meanderservices.com/img/',
        // basePath: function (path: string) {
        //     return path.includes('whatsappapi')
        //         ? 'https://' + this.mode + path + '.meanderservices.com'
        //         : 'http://' + this.mode + path + '.meanderservices.com';
        // }
        basePath: function (path: string) {
            return path.includes('whatsappapi')
                ? 'https://' + this.mode + path + '.prospot.online'
                : 'http://' + this.mode + path + '.prospot.online';
        }
        // Diğer dev konfigürasyonları...
    },
    production: {
        mode: 'prod',
        applicationId: '1',
        mediaUrl: 'http://login.meanderservices.com/assets',
        loginPageLink: 'http://loginpreview.meanderservices.com/',
        getMedia: 'http://login.meanderservices.com/assets/company',
        whatsappMediaUrl: 'https://whatsappapi.meanderservices.com/img/',
        // basePath: function (path: string) {
        //     return path.includes('whatsappapi') ? 'https://' + this.mode + path + '.meanderservices.com' : 'http://' + path + '.meanderservices.com';
        // }
        basePath: function (path: string) {
            return path.includes('whatsappapi') ? 'https://' + this.mode + path + '.prospot.online' : 'http://' + path + '.meanderservices.com';
        }
        // Diğer prod konfigürasyonları...
    }
    // test: {
    //     // Test konfigürasyonları...
    // }
    // İhtiyaç duyulan diğer ortamları ekleyin...
};

const envConfig: EnvironmentConfig = config[environment];

export default envConfig;

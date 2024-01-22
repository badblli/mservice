// globalHelper.ts dosyası
import type { AxiosResponse } from 'axios';
import envConfig from '../config'; // config dosyasını import et
import api from '../axios'; // axios dosyasını import et
import { useLanguages } from '@/stores/language';
import { useAuthStore } from '@/stores/auth';
import { useTablesStore } from '@/stores/table';
import { router } from '@/router';

const uid = () => {
    return Math.random().toString(36).substr(2, 9);
};

const parse = (string: string) => {
    return JSON.parse(string.replace(/\\/g, ''));
};

const beforeSubmitData = function (data: { [key: string]: string }, formatDate: string[]) {
    formatDate.filter(function (a) {
        if (data[a]) {
            const dateArr = data[a].split('.');
            let year = '';
            let hour = '';
            if (dateArr[2]) {
                if (dateArr[2].includes(' ')) {
                    year = dateArr[2].split(' ')[0];
                    hour = 'T' + dateArr[2].split(' ')[1];
                } else {
                    year = dateArr[2];
                }
                data[a] = year + '-' + dateArr[1] + '-' + dateArr[0] + hour;
            } else {
                // data[a] = dateArr
            }
        }
    });

    return data;
};

const getApi = async <T>(
    applicationName: string,
    controllerName: string,
    name: string,
    params: Record<string, any> | null = null,
    dontUseGet = false,
    formatDate: string[] = [],
    baseURLLink = false
): Promise<AxiosResponse<T>> => {
    try {
        if (params !== null && formatDate.length > 0) {
            params = beforeSubmitData(params, formatDate);
        }

        api.defaults.headers.common.Authorization = localStorage.getItem('Token') || useAuthStore().getToken;

        api.defaults.headers.common.CorrelationID = uid();
        api.defaults.headers.common.ClientIP = localStorage.getItem('ClientIP') || '';
        api.defaults.headers.common.GlobalCompanyID = 'ProtalyaOfisTest';
        api.defaults.headers.common.ApplicationID = envConfig.applicationId || 1;

        let actionName = dontUseGet ? '/' + name : '/Get' + name;
        let mainUrl = baseURLLink ? 'http://' + applicationName : envConfig.basePath(applicationName);

        const response = await api.get<T>(controllerName + actionName, {
            params,
            baseURL: mainUrl
        });

        return response;
    } catch (error: any) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            localStorage.setItem('loginModal', 'true'); // Convert boolean value to string
            // storeSettings.state.loginModal = true;
        }

        throw error; // Hata tekrar fırlatılır
    }
};

const callPostApi = async (
    applicationName: string,
    controllerName: string,
    name: string,
    data: Record<string, any> | null = null,
    formatDate: string[] = [],
    dontGoTable = false,
    manuelURL = false,
    baseURLLink = false
): Promise<AxiosResponse<any> | false> => {
    // Assuming beforeSubmitData is defined elsewhere
    // if (formatDate.length > 0) {
    //     data = beforeSubmitData(data, formatDate);
    // }

    let mainUrl = '';
    if (manuelURL) {
        mainUrl = 'http://' + envConfig.mode + '.' + applicationName;
    } else if (baseURLLink) {
        mainUrl = 'http://' + envConfig.applicationId;
    } else {
        mainUrl = envConfig.basePath(applicationName);
    }

    api.defaults.headers.common.Authorization = useAuthStore().getToken;
    api.defaults.headers.common.GlobalCompanyID = 'ProtalyaOfisTest';
    api.defaults.headers.common.ApplicationID = envConfig.applicationId || 1;

    try {
        const response = await api.post(controllerName + '/' + name, data, { baseURL: mainUrl });

        if (response.data.status === 1) {
            if (!dontGoTable) {
                // Assuming getApi is defined elsewhere
                await getApi<any>(applicationName, controllerName, name, null, false, [], baseURLLink);
            }
            return response;
        } else if (response.data.status === 2) {
            console.log(response.data.message);
            return false;
        } else if (response.data.status === 3) {
            response.data.validationErrorList.forEach((a: any[]) => {
                console.log(a);
            });
            return false;
        } else if (response.data.status === 5) {
            return response;
        }
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            router.push('/auth/login');
            // storeSettings.state.loginModal = true;
        }

        throw error;
    }

    return false; // In case no condition is met, for example, if the response status is not handled.
};
const checkEmptyValue = function (fields: any, status: boolean): boolean {
    if (fields === null && status === true) {
        return true;
        //return getLabel('PleaseSelect', 'Common')
    }
    return false; // Eğer yukarıdaki koşul sağlanmazsa false döndür
};
const checkDate = function (val: string): string {
    if (!val) {
        return getLabel('InvalidDate', 'Common');
    }

    const dateArr: string[] = val.split('.');
    // const Year = new Date()

    if (parseInt(dateArr[0]) > 31 || dateArr[0] === '00' || dateArr[1] === '00' || parseInt(dateArr[1]) > 12) {
        return getLabel('InvalidDate', 'Common');
    }

    // Return type should be specified based on your getLabel function's return type
    return ''; // Adjust the return statement accordingly
};

const checkDateAndTime = function (val: string): string {
    if (!val) {
        return getLabel('InvalidDate', 'Common');
    } else {
        // Do nothing with the else block, it's empty in the original code
    }

    const dateTime: string[] = val.split(' ');
    const dateArr: string[] = dateTime[0].split('.');

    if (parseInt(dateArr[0]) > 31 || dateArr[0] === '00' || dateArr[1] === '00' || parseInt(dateArr[1]) > 12) {
        return getLabel('InvalidDate', 'Common');
    }

    if (dateTime[1]) {
        const times: string[] = dateTime[1].split(':');
        if (times[0].length === 2 && times[1].length === 2) {
            // true
        } else {
            return getLabel('InvalidTime', 'Common');
        }
    } else {
        return getLabel('InvalidTime', 'Common');
    }

    // Return type should be specified based on your getLabel function's return type
    return ''; // Adjust the return statement accordingly
};
const convertDate = function (localDate: string, separate: string = '.', format: string = '/'): string {
    // if (localDate == null) {
    //  localDate = date.formatDate(new Date(), 'DD.MM.YYYY')
    // }

    if (localDate) {
        const dateArr: string[] = localDate.split(separate);
        let year: string = '';
        let hour: string = '';

        if (dateArr[2] && dateArr[2].includes(' ')) {
            year = dateArr[2].split(' ')[0];
            hour = ' ' + dateArr[2].split(' ')[1];
        } else {
            year = dateArr[2];
        }

        return year + format + dateArr[1] + format + dateArr[0] + hour;
    }

    // Return type should be specified based on the expected return type
    return ''; // Adjust the return statement accordingly
};
const getLabel = function (inputName: string, parentName: string | null = null): string {
    let Text: string = inputName;

    if (parentName !== null) {
        const parentLanguage: Array<any> = [];
        const translationList = JSON.parse(localStorage.getItem('translationList') || '[]');
        translationList.filter(function (a: any) {
            if (a.ParentName === parentName) {
                parentLanguage.push(a);
            }
        });

        parentLanguage.filter(function (a: any) {
            if (a.Name === inputName) {
                Text = a.Text;
            }
        });
    } else {
        Text = useLanguages().getTextByName(inputName) || inputName;
    }

    // console.log(Text)
    return Text;
};
const createMenu = (list: any[]): any[] => {
    let map: { [key: number]: number } = {},
        node: any,
        roots: any[] = [],
        i: number;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].ID] = i;
        list[i].Submenu = [];
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.ParentID !== 0) {
            list[map[node.ParentID]].Submenu.push(node);
        } else {
            roots.push(node);
        }
    }

    roots.sort(function (a, b) {
        return a.Order - b.Order;
    });

    return roots;
};
const getTable = function (
    applicationName: string,
    controllerName: string,
    name: string,
    params: any = null,
    deleteRow: boolean = false,
    formatDate: any[] = [],
    baseURLLink: boolean = false,
    baseURLLinkWithGet: boolean = false
) {
    localStorage.setItem('requestURL', '');
    localStorage.setItem('requestParam', '');
    localStorage.setItem('requestPageName', '');
    useTablesStore().resetRows();
    api.defaults.headers.common.Authorization = useAuthStore().getToken;
    api.defaults.headers.common.GlobalCompanyID = 'ProtalyaOfisTest';
    api.defaults.headers.common.ApplicationID = envConfig.applicationId || 1;
    // Yeni eklendi.
    if (formatDate.length > 0) {
        params = beforeSubmitData(params, formatDate);
    }
    if (deleteRow) {
        if (localStorage.has(controllerName + 'Params') === true) {
            params = localStorage.getItem(controllerName + 'Params');
        }
    }

    useTablesStore().loadingTrue();

    if (baseURLLink) {
        api.get(controllerName + '/' + name, {
            params,
            baseURL: 'http://' + applicationName
        })
            .then((response) => {
                localStorage.setItem('requestURL', response.config.url);
                localStorage.setItem('requestParam', response.config.params);
                localStorage.setItem('requestPageName', name);
                if (response.data.status === 1) {
                    useTablesStore().addRows(JSON.parse(response.data.result));
                }
            })
            .catch(function (error) {
                useTablesStore().resetRows();
                if (error.response && error.response.status === 401) {
                    localStorage.setItem('loginModal', true);
                }
            });
    } else {
        let mainUrl = '';
        if (baseURLLinkWithGet) {
            mainUrl = 'http://' + applicationName;
        } else {
            mainUrl = envConfig.basePath(applicationName);
        }

        api.get(controllerName + '/Get' + name, {
            params,
            baseURL: mainUrl
        })
            .then((response) => {
                localStorage.setItem('requestURL', response.config.url);
                localStorage.setItem('requestParam', response.config.params);
                localStorage.setItem('requestPageName', name);
                if (response.data.status === 1) {
                    useTablesStore().addRows(JSON.parse(response.data.result));
                } else {
                    useTablesStore().resetRows();
                }
            })
            .catch(function (error) {
                useTablesStore().resetRows();
                if (error.response && error.response.status === 401) {
                    localStorage.setItem('loginModal', true);
                }
            });
    }
};
const tabCreate = function (
    Tabs: { ID: number }[],
    List: { LanguageID?: number }[],
    Empty: { [key: string]: any }[]
): { [key: string]: any }[] {
    if (Tabs.length > List.length) {
        for (let ii = List.length - 1; ii < Tabs.length; ii++) {
            List.push({ ...Empty });
            if (Tabs[ii]) {
                List[ii].LanguageID = Tabs[ii].ID;
            }
        }
        List.splice(-1, 1);
    }
    return List;
};

interface MenuItem {
    ParentID: number;
    ID: number;
    Name: string;
    MenuLevel: number;
    UrlSlug: string;
    MenuOrder: number;
    Visible: boolean;
    MenuIcon: string;
    MenuIconStyle: string;
    Submenu: MenuItem[];
}

interface MenuItem {
    title: string;
    icon?: string;
    to?: string;
    children?: MenuItem[];
    disabled?: boolean;
    subCaption?: string;
    chip?: string;
    chipColor?: string;
    chipBgColor?: string;
    chipVariant?: string;
    type?: string;
}

interface OriginalMenuItem {
    ParentID: number;
    ID: number;
    Name: string;
    MenuLevel: number;
    UrlSlug: string;
    MenuOrder: number;
    Visible: boolean;
    MenuIcon: string;
    MenuIconStyle: string;
    Submenu: OriginalMenuItem[];
}

function organizedMenu(originalMenu: OriginalMenuItem[]): MenuItem[] {
    const result: MenuItem[] = [];

    originalMenu.forEach((item) => {
        const newMenuItem: MenuItem = {
            title: item.Name,
            icon: item.MenuIcon,
            to: item.UrlSlug,
            // children: organizedMenu(item.Submenu),
            disabled: !item.Visible
            // Add more properties as needed
        };
        if (item.Submenu && item.Submenu.length > 0) {
            newMenuItem.children = organizedMenu(item.Submenu);
        }

        result.push(newMenuItem);
    });

    return result;
}

export {
    getApi,
    callPostApi,
    getTable,
    tabCreate,
    parse,
    checkEmptyValue,
    checkDate,
    checkDateAndTime,
    convertDate,
    getLabel,
    createMenu,
    organizedMenu
};

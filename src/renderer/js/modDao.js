import * as ini from 'ini';
// import { util } from './util';
import * as path from 'path';
import * as log from 'electron-log';
import * as fs from 'fs-extra';
import * as parser from 'luaparse';

// document.onclick = function () {

//     let filePath = '.src/renderer/resources/modinfo.lua';
//     readFromFile_modInfo(filePath);

// };
/**
 * 读取modoverride的值
 * @param {String} modOverridePath  
 */
export function readFromFile_ModOverride(modOverridePath, modsFolderPath) {

    // 1 .读取modinfo所有mod的路径 (读取所有mod文件用异步更好,可是不会啊)
    let ModInfos = readAllModInfo(modsFolderPath);

    // 2,遍历modoverrides 填写

    let ast = parser.parse(fs.readFileSync(modOverridePath).toString());
    let itemsArr = ast['body'][0]['arguments'][0]['fields'];
    // console.log(itemsArr);
    //  itemsArr  modoverrides中的很多项
    for (let i = 0; i < itemsArr.length; i++) {
        // element =>  ["workshop-350811795"]={ configuration_options={  }, enabled=true },
        const element = itemsArr[i];
        // 文件夹名
        let folderName = element['key']['value'];
        let configuration_options_or_enabled_Arr = element['value']['fields'];
        for (let j = 0; j < configuration_options_or_enabled_Arr.length; j++) {
            // elementConfig => configuration_options={  }, enabled=true
            const elementConfig = configuration_options_or_enabled_Arr[j];

            // 如果是enabled
            if (elementConfig['key']['name'] === 'enabled') {
                // ModInfos[folderName]['enabled'] = {};
                ModInfos[folderName]['enabled'] = elementConfig['value']['value'];
            }
            // 如果是configuration_options
            if (elementConfig['key']['name'] === 'configuration_options') {
                // ENABLEPINGS=true, FIREOPTIONS = 2,
                let configuration_optionsArr = elementConfig['value']['fields'];
                for (let z = 0; z < configuration_optionsArr.length; z++) {
                    // onfiguration_optionsItem  ===>  ENABLEPINGS = true,
                    const onfiguration_optionsItem = configuration_optionsArr[z];
                    // onfiguration_optionsItem['key']['name'];
                    // onfiguration_optionsItem['value']['value'];

                    // 给modinfos 下的 configuration_options 赋值 把current赋值进去
                    let modInfo_configuration_optionsItems = ModInfos[folderName]['configuration_options'][onfiguration_optionsItem['key']['name']];
                    // console.log(linshi);
                    if (modInfo_configuration_optionsItems === undefined) {
                        continue;
                    }
                    modInfo_configuration_optionsItems['current'] = onfiguration_optionsItem['value']['value'];

                }

            }

        }

    }
    // console.log(ModInfos);
    return ModInfos;
}

function readAllModInfo(path) {
    let ModInfos = {};
    let pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        let info = fs.statSync(path + '/' + ele)
        if (info.isDirectory()) {
            // console.log("dir: " + ele)
            let modinfo = readFromFile_modInfo(path + '/' + ele + '/modinfo.lua');
            ModInfos[ele] = modinfo;
        }
    })
    return ModInfos;
}

/**
 * 读取modinfo.lua存到自定义接口类型 ModInfo中
 * @param {String} filePath modinfo.lua地址
 */
export function readFromFile_modInfo(filePath) {

    let modInfo = {};

    // 1.前面简单的lua字符串
    let ast = parser.parse(fs.readFileSync(filePath).toString());
    // console.log(ast);
    let modInfoItem = ast['body'];
    let map = new Map();
    modInfoItem.forEach(element => {
        // 如果不存在 直接跳到下一个循环
        if (Array.isArray(element['variables'])) {

            let key = element['variables'][0]['name'];
            let value;

            if (key === 'configuration_options') {

                value = element['init'][0]['fields'];
            } else {
                value = element['init'][0]['value'];
            }

            map.set(key, value);
        }
    });

    // 2.赋值
    modInfo.name = map.get('name') || '';
    modInfo.forumthread = map.get('forumthread') || '';
    modInfo.author = map.get('author') || '';
    modInfo.version = map.get('version') || '';
    modInfo.description = map.get('description') || '';
    modInfo.api_version = map.get('api_version') || '';
    modInfo.dont_starve_compatible = map.get('dont_starve_compatible') || false;
    modInfo.reign_of_giants_compatible = map.get('reign_of_giants_compatible') || false;
    modInfo.shipwrecked_compatible = map.get('shipwrecked_compatible') || false;
    modInfo.dst_compatible = map.get('dst_compatible') || false;
    modInfo.version_compatible = map.get('version_compatible') || '';
    modInfo.all_clients_require_mod = map.get('all_clients_require_mod') || false;
    modInfo.client_only_mod = map.get('client_only_mod') || false;
    modInfo.icon = map.get('icon') || '';
    modInfo.enabled = false;
    // 3. configuration_options
    // 如果有 configuration_options
    // 这里面一层又一层啊啊啊啊啊啊啊
    let config = {};
    /*     
            config = {};
    
            config[0] = {};
            config[0]['name'] = {};
    
            config[0]['option'][0] = {};
            config[0]['option'][0]['description'] = {}; 
        */

    // 如果有configuration_options
    if ((map.get('configuration_options'))) {

        // 首先先获得configuration_options的内容
        let configuration_options = map.get('configuration_options');
        // console.log(configuration_options);
        // 遍历 configuration_options 中的每一项
        for (let i = 0; i < configuration_options.length; i++) {

            // 这个一个小项数组 测试中的这个一共4个
            let smallItems = configuration_options[i]['value']['fields'];

            // 这里定义一个用于储存name的值 ,遍历之后取出name值再赋值
            let zhenshiName = '';

            // 遍历这个小项,先专门取出name值
            if (!Array.isArray(smallItems)) {
                continue;
            }
            for (let j = 0; j < smallItems.length; j++) {

                // 得到 name ,label,hover,default
                const smallItem = smallItems[j];
                let smallItemKey = smallItem['key']['name'];
                if (smallItemKey === 'name') {
                    // 如果是name这一项,赋值给zhenshiName
                    zhenshiName = smallItem['value']['value'];
                    break;
                }
            }

            // 取出name值后,就可以写入config的第一项 config[name]
            config[zhenshiName] = {};
            config[zhenshiName]['current'] = '';
            // 再循环一次,填写各个项目,分是否是options
            for (let j = 0; j < smallItems.length; j++) {

                // 得到 name ,label,hover,default
                const smallItem = smallItems[j];
                let smallItemKey = smallItem['key']['name'];
                if (smallItemKey !== 'options') { // 如果不是options,赋值第二层
                    if (smallItemKey === 'default') {
                        config[zhenshiName]['current'] = smallItem['value']['value'];
                    }
                    config[zhenshiName][smallItemKey] = smallItem['value']['value'];
                }
                if (smallItemKey === 'options') { // 如果是options,赋值一个空的options
                    config[zhenshiName]['options'] = {};
                    // 在解析options 
                    // 首先 先获得options的内容
                    let options = smallItem['value']['fields'];

                    // 然后遍历这个options,取出每一项      options 像下面这样
                    // {description = "开", data = true, hover = "开启修复汉化"},
                    // { description = "关", data = false, hover = "关闭修复汉化" },
                    if (!Array.isArray(options)) {
                        continue;
                    }
                    for (let z = 0; z < options.length; z++) {
                        config[zhenshiName]['options'][z] = {};
                        // optionsItems => {description = "开", data = true, hover = "开启修复汉化"},
                        const optionsItems = options[z];
                        // console.log(optionsItems);
                        // 再遍历 optionsItems 取出  description data hover 等
                        if (!Array.isArray(optionsItems['value']['fields'])) {
                            continue;
                        }
                        for (let h = 0; h < optionsItems['value']['fields'].length; h++) {
                            const optionSmallItems = optionsItems['value']['fields'][h];

                            // 赋值
                            config[zhenshiName]['options'][z][optionSmallItems['key']['name']] = optionSmallItems['value']['value'];

                        }

                    }
                }
            }

        }

    }
    // console.log(config);
    modInfo.configuration_options = config;
    return modInfo;
}
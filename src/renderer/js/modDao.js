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
 * 读取modinfo.lua存到自定义接口类型 ModInfo中
 * @param filePath modinfo.lua地址
 */
export function readFromFile_modInfo(filePath) {

    let modInfo = {};

    // 1.前面简单的lua字符串
    var ast = parser.parse(fs.readFileSync(filePath).toString());
    console.log(ast);
    let modInfoItem = ast['body'];
    let map = new Map();
    modInfoItem.forEach(element => {
        let key = element['variables'][0]['name'];
        let value;

        if (key === 'configuration_options') {

            value = element['init'][0]['fields'];
        } else {
            value = element['init'][0]['value'];
        }

        map.set(key, value);

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

    // 3. configuration_options
    // 如果有 configuration_options
    // 这里面一层又一层啊啊啊啊啊啊啊
    let config = {};
    /*     
        config['co'] = {};
    
        config['co'][0] = {};
        config['co'][0]['name'] = {};
    
        config['co'][0]['option'][0] = {};
        config['co'][0]['option'][0]['description'] = {}; 
    */

    if ((map.get('configuration_options'))) {

        let coArr = map.get('configuration_options');
        config['co'] = {};
        // i 大项
        for (let i = 0; i < coArr.length; i++) {
            let itemConfigArr = coArr[i]['value']['fields'];
            config['co'][i] = {};

            // 1.把每一项先存到一个map中,  name = 'IS_CHS_FIX_ALL'
            let itemMap = new Map();
            for (let j = 0; j < itemConfigArr.length; j++) {
                let itemkey = itemConfigArr[j]['key']['name'];
                let itemvalue;
                if (itemkey === 'options') {
                    itemvalue = itemConfigArr[j]['value']['fields'];
                } else {
                    itemvalue = itemConfigArr[j]['value']['value'];
                }
                itemMap.set(itemkey, itemvalue);

                // 如果有option
                if (itemkey === 'options') {
                    let optionArr = itemMap.get('options');

                    config['co'][i]['options'] = {};
                    // 1.这里和 上面注释 i大项 是一样的
                    for (let z = 0; z < optionArr.length; z++) {
                        let itemOptionArr = optionArr[z]['value']['fields'];

                        // 1.把每一项先存到一个map中, description = '开'
                        // 2.遍历map,存到config中. t代表description,data这种小项
                        let optionMap = new Map();
                        for (let t = 0; t < itemOptionArr.length; t++) {
                            let optionkey = itemOptionArr[t]['key']['name'];
                            let optionvalue = itemOptionArr[t]['value']['value'];
                            optionMap.set(optionkey, optionvalue);
                        }

                        // 存到config的options中

                        config['co'][i]['options'][z] = {};
                        config['co'][i]['options'][z]['description'] = optionMap.get('description') || '';
                        config['co'][i]['options'][z]['data'] = optionMap.get('data');
                        config['co'][i]['options'][z]['hover'] = optionMap.get('hover') || '';

                    }
                }
            }
            // 存到config中
            config['co'][i]['name'] = itemMap.get('name');
            config['co'][i]['label'] = itemMap.get('label') || '';
            config['co'][i]['hover'] = itemMap.get('hover') || '';
            config['co'][i]['default'] = itemMap.get('default');
            config['co'][i]['curent'] = itemMap.get('default');
        }

    }
    modInfo.configuration_options = config;
    // console.log(modInfo);
    console.log(modInfo);
    return modInfo;
}
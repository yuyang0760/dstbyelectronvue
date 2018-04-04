// import { util } from './util';
// import * as log from 'electron-log';
import * as fs from 'fs-extra';
import * as parser from 'luaparse';

/**
 *  1. 对世界的读写  
 * 
 * 
 */

// document.onclick = function () {

//   let map: Map<string, worldmap> = new Map();
//   // map.set('mst', { filePath: './src/renderer/resources/worldgenoverride-master.lua', forestOrCave: 'forest' });
//   map.set('dixia', { filePath: './src/renderer/resources/worldgenoverride-caves.lua', forestOrCave: 'cave' });
//   //  readFromFile_IDValue('./src/renderer/resources/worldgenoverride-master.lua');
//   writeFile(readFromFile(map));
//   // readFromFile(['./src/renderer/resources/worldgenoverride-master.lua']);

// };

/**
 * 从文件读取,返回世界的配置 worldinterface 接口类型 
 *  @param map   Map<string, worldmap> 
 */
export function readFromFile(map) {
  let worldObj = {};
  worldObj['world'] = {};

  map.forEach((wm, flag) => {

    // 1.读取ID和value值 以便赋值给 ID value
    let IDValues = readFromFile_IDValue(wm.filePath);

    // 2.读取json里面 describe 以便赋值给 describe  Master
    let worldItemsJson = fs.readJSONSync((wm.forestOrCave === 'forest' ? './src/renderer/resources/worldForest.json' : './src/renderer/resources/worldCave.json'));
    // console.log(worldItemsJson);

    worldObj['world'][flag] = {};
    worldObj['world'][flag]['worldFlag'] = flag;
    worldObj['world'][flag]['forestOrCave'] = wm.forestOrCave;
    worldObj['world'][flag]['filePath'] = wm.filePath;
    worldObj['world'][flag]['data'] = {};

    // 3.开始赋值
    IDValues.forEach(function (value, key) {

      worldObj['world'][flag]['data'][key] = {};
      worldObj['world'][flag]['data'][key]['ID'] = key;
      worldObj['world'][flag]['data'][key]['value'] = value;
      worldObj['world'][flag]['data'][key]['pic'] = './src/renderer/resources/worldPic/' + key;
      worldObj['world'][flag]['data'][key]['desc'] = worldItemsJson['worldItems'][key] === undefined ? key : (worldItemsJson['worldItems'][key]['desc']);
      worldObj['world'][flag]['data'][key]['defaultValue'] = worldItemsJson['worldItems'][key] === undefined ? value : (worldItemsJson['worldItems'][key]['defaultValue']);
      worldObj['world'][flag]['data'][key]['whichType'] = worldItemsJson['worldItems'][key] === undefined ? 'World' : (worldItemsJson['worldItems'][key]['whichType']);
      worldObj['world'][flag]['data'][key]['option'] = worldItemsJson['worldItems'][key] === undefined ? {
        default: '默认'
      } : (worldItemsJson['worldItems'][key]['option']);

    })
  });
  // console.log(JSON.stringify(worldObj));
  // console.log(worldObj);
  return worldObj;
}

/**
 * worldgenoverride.lua文件读取,返回map,里面装的ID和value值
 * @param filePath worldgenoverride.lua地址
 */
function readFromFile_IDValue(filePath) {

  // 解析lua字符串
  var ast = parser.parse(fs.readFileSync(filePath).toString());
  let worldItems = ast['body'][0]['arguments'][0]['fields'][2]['value']['fields'];

  // 设置返回值
  let IDs_and_Values = new Map();

  // 遍历worldItems数组 然后返回
  worldItems.forEach(element => {

    let ID = element['key']['name']; /* ID值 */
    let value = element['value']['value']; /* value值 */
    IDs_and_Values.set(ID, value);

  });

  // console.log(IDs_and_Values);
  return IDs_and_Values;

}

/**
 * 根据世界对象的值,写入文件
 * @param worldi 世界对象
 */
export function writeFile(worldi) {

  for (const key in worldi.world) {
    if (worldi.world.hasOwnProperty(key)) {

      // let filePath: string = worldi.world[key].filePath;
      let data = worldi.world[key].data;

      let re = '';
      let pinjieArr = ['', '', '', '', ''];

      for (const id in data) {
        if (data.hasOwnProperty(id)) {

          // 取出各种值
          let value = data[id].value;
          // let defaultValue = data[id].defaultValue;
          let options = data[id].option;
          let desc = data[id].desc;
          let whichType = data[id].whichType;

          // 遍历option 以便拼接
          let optionStr = [];
          for (const k in options) {
            if (options.hasOwnProperty(k)) {
              optionStr.push(k);
            }
          }
          let option = optionStr.join(',');

          // 拼接
          pinjie(pinjieArr, whichType, id, value, desc, option);

        }
      }

      re = '\r\n--World 世界设置\r\n\r\n' + pinjieArr[0] + '\r\n--Resources 资源\r\n\r\n' + pinjieArr[1] +
        '\r\n--UNPREPARED 食物\r\n\r\n' + pinjieArr[2] + '\r\n--Animals 动物\r\n\r\n' + pinjieArr[3] +
        '\r\n--Monsters 怪物\r\n\r\n' + pinjieArr[4];
      console.log(re);

    }
  }

}

function pinjie(pinjieArr, whichType, id, value, desc, option) {
  if (whichType === 'World') {
    pinjieArr[0] += id + ' '.repeat(18 - id.length) + '=' + value + ' '.repeat(16 - value.length) + '--' + desc + ' '.repeat(26 - (desc.replace(/[^\x00-\xff]/g, 'xx').length)) + option + '\r\n';
  }
  if (whichType === 'Resources') {
    pinjieArr[1] += id + ' '.repeat(18 - id.length) + '=' + value + ' '.repeat(16 - value.length) + '--' + desc + ' '.repeat(26 - (desc.replace(/[^\x00-\xff]/g, 'xx').length)) + option + '\r\n';
  }
  if (whichType === 'Animals') {
    pinjieArr[3] += id + ' '.repeat(18 - id.length) + '=' + value + ' '.repeat(16 - value.length) + '--' + desc + ' '.repeat(26 - (desc.replace(/[^\x00-\xff]/g, 'xx').length)) + option + '\r\n';
  }
  if (whichType === 'Monsters') {
    pinjieArr[4] += id + ' '.repeat(18 - id.length) + '=' + value + ' '.repeat(16 - value.length) + '--' + desc + ' '.repeat(26 - (desc.replace(/[^\x00-\xff]/g, 'xx').length)) + option + '\r\n';
  }
  if (whichType === 'Unprepared') {
    pinjieArr[2] += id + ' '.repeat(18 - id.length) + '=' + value + ' '.repeat(16 - value.length) + '--' + desc + ' '.repeat(26 - (desc.replace(/[^\x00-\xff]/g, 'xx').length)) + option + '\r\n';
  }
}

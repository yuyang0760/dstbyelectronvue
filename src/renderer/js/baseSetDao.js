/**
 *  1. 读取cluster.ini文件 返回baseSet对象
 *  2. 根据baseSet对象 修改cluster.ini文件
 */
import * as ini from 'ini';
import { BaseSet } from '@/js/baseSet';
// import { util } from './util';
import * as path from 'path';
// import * as log from 'electron-log';
import * as fs from 'fs-extra';

/**
 * 从文件 读取基础设置 返回 baseSet对象
 * @param filePath cluster.ini的文件路径
 */
export function readFromFile(filePath) {

  // log.info('开始 读取cluster.ini文件');
  // 如果文件不存在,返回 undefined
  if (!fs.existsSync(filePath)) {
    // log.warn("cluster.ini文件不存在.路径" + filePath);
    return 404;
  }
  // 基本设置
  let baseSet = new BaseSet();

  // ini 解析
  var config = ini.parse(fs.readFileSync(filePath, 'utf-8'));

  baseSet.gameStyle = config.NETWORK.cluster_intention || 'cooperative';
  baseSet.houseName = config.NETWORK.cluster_name || 'yy';
  baseSet.describe = config.NETWORK.cluster_description || '';
  baseSet.gameMode = config.GAMEPLAY.game_mode || 'endless';
  baseSet.isPvP = config.GAMEPLAY.pvp || false;
  baseSet.maxPlayers = config.GAMEPLAY.max_players || 20;
  baseSet.secret = config.NETWORK.cluster_password || '';
  // 服务器模式 offline_cluster=true (true 是 离线 false 是在线)
  baseSet.serverMode = config.NETWORK.offline_cluster || false;
  baseSet.isPause = config.GAMEPLAY.pause_when_empty && true;
  baseSet.isCave = config.SHARD.shard_enabled || false;

  // log.info("结束 cluster.ini文件读取.")
  return baseSet;
}

/**
 * 根据baseSet对象写入到文件中
 * @param filePath cluster.ini 路径 例:c:\a.ini
 * @param baseSet baseSet对象
 */
export function writeFile(filePath, baseSet) {

  // console.log('开始 根据baseSet对象写入cluster.ini文件.')
  // 如果文件不存在
  if (!fs.existsSync(filePath)) {

    // console.log('cluster.ini文件不存在,创建文件');
    // 创建目录
    fs.mkdirsSync(path.dirname(filePath));
    // 复制模板文件
    fs.copySync('./src/renderer/resources/cluster.ini', filePath);

    // console.log('创建cluster.ini文件完成');
    return;
  }

  // 如果文件存在,构造config对象,之后写入文件
  var config = ini.parse(fs.readFileSync(filePath, 'utf-8'));
  config.GAMEPLAY.game_mode = baseSet.gameMode;
  config.GAMEPLAY.max_players = baseSet.maxPlayers;
  config.GAMEPLAY.pvp = baseSet.isPvP;
  config.GAMEPLAY.pause_when_empty = baseSet.isPause;
  config.NETWORK.lan_only_cluster = baseSet.lan_only_cluster;
  config.NETWORK.cluster_intention = baseSet.gameStyle;
  config.NETWORK.cluster_description = baseSet.describe;
  config.NETWORK.cluster_name = baseSet.houseName;
  config.NETWORK.offline_cluster = baseSet.serverMode;
  config.NETWORK.cluster_password = baseSet.secret;
  config.MISC.console_enabled = baseSet.console_enabled;
  config.SHARD.shard_enabled = baseSet.shard_enabled;
  config.SHARD.bind_ip = baseSet.bind_ip;
  config.SHARD.master_ip = baseSet.master_ip;
  config.SHARD.master_port = baseSet.master_port;
  config.SHARD.cluster_key = baseSet.cluster_key;

  console.log(config);

  fs.writeFile(filePath, ini.stringify(config));
  console.log('结束 根据baseSet对象写入cluster.ini文件.');
}

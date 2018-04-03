import * as fs from 'fs-extra';
/**
 * 基础设置类
 */
export class BaseSet {
    constructor() {
        this.houseName = 'yy的房间';
        this.describe = '饥荒交流群:580332268';
        this.gameStyle = '';
        this.serverMode = false;
        this.isPvP = false;
        this.maxPlayers = 20;
        this.secret = '';
        this.gameMode = '';
        this.isPause = true;
        this.isCave = false;
        this.lan_only_cluster = true;
        this.console_enabled = true;
        this.shard_enabled = true;
        this.bind_ip = '127.0.0.1';
        this.master_ip = '127.0.0.1';
        this.master_port = 10888;
        this.cluster_key = 'defaultPass';
        // 设置option
        let options = fs.readJSONSync('./src/renderer/resources/baseSet.json');
        this.gamestyle_options = options.gamestyle_options;
        this.gamemode_options = options.gamemode_options;
        this.iscave_options = options.iscave_options;
        this.ispause_options = options.ispause_options;
        this.ispvp_options = options.ispvp_options;
        this.servermode_options = options.servermode_options;
        this.maxplayers_options = options.maxplayers_options;
    }
    houseName;
    describe;
    gameStyle;
    gamestyle_options;
    serverMode;
    servermode_options;
    isPvP;
    ispvp_options
    maxPlayers;
    maxplayers_options;
    secret;
    gameMode;
    gamemode_options;
    isPause;
    ispause_options;
    isCave;
    iscave_options;
    lan_only_cluster;
    console_enabled;
    shard_enabled;
    bind_ip;
    master_ip;
    master_port;
    cluster_key;
}

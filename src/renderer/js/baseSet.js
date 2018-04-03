
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
        this.lanOnlyCluster = true;
        this.consoleEnabled = true;
        this.shardEnabled = true;
        this.bindIp = '127.0.0.1';
        this.masterIp = '127.0.0.1';
        this.masterPort = 10888;
        this.clusterKey = 'defaultPass';
    }
    /**
     * 房间名称
     */
    houseName;
    /**
     * 描述
     */
    describe;

    /**
     * 游戏风格
     */
    gameStyle;

    /**
     * 服务器模式
     */
    serverMode;

    /**
     * 是否开启PVP
     */
    isPvP;

    /**
     * 最大人数
     */
    maxPlayers;

    /**
     * 密码
     */
    secret;

    /**
     * 游戏模式
     */
    gameMode;

    /**
     * 是否无人时暂停
     */
    isPause;

    /**
     * 是否开启洞穴
     */
    isCave;
    lanOnlyCluster;
    consoleEnabled;
    shardEnabled;
    bindIp;
    masterIp;
    masterPort;
    clusterKey;
}
const group = {
  login: '用户登录',
  loginout: '用户安全退出',
  user: '用户信息（资料）',
  updateUser: '修改用户信息（资料）',
  updatePwd: '修改登录密码',
  dataMonitor: '业务数据监控',
  custom: '客户服务监控',
  company: '燃气公司运营',
  duty: '责任部门（或责任人）',
};

const api = '接口';
const field = '字段';
const type = '类型';
const number = 'Number';
const string = 'String';
const boolean = 'Boolean';
const array = 'Array';
const object = 'Object';
// const unix13 = 'Unix 时间戳(13位)';

const fieldType = `${field}${type}`;

// 文字信息
export const messageSuccess = '获取数据成功';
export const saveSuccess = '已保存配置';
export const loginSuccess = '登录成功';
export const loginOutSuccess = '已安全退出';
export const updatePwdSuccess = '登录密码已修改';
export const updateSuccess = '更新成功';
// 标识
export const tagRequired = '[必填]';
export const tagNoRequired = '[选填]';
// 字数限制
export const wordLimit = '字数不超过200字';
// 接口
export const apiLogin = `[${group.login}] ${api}:`; // eg.[用户登录] 接口:
export const apiLoginOut = `[${group.loginout}] ${api}:`; // eg.[用户安全退出] 接口:
export const apiGetUser = `[${group.user}] ${api}:`; // eg.[用户信息（资料）] 接口:
export const apiUpdatePwd = `[${group.updatePwd}] ${api}:`; // eg.[修改登录密码] 接口:
export const apiUpdateUser = `[${group.updateUser}] ${api}:`; // eg.[修改用户信息（资料）] 接口:
export const apiCustom = `[${group.custom}] ${api}:`; // eg.[客户服务监控] 接口:
export const apiDataMonitor = `[${group.dataMonitor}] ${api}:`; // eg.[业务数据监控] 接口:
export const apiCompany = `[${group.company}] ${api}:`; // eg.[燃气公司运营] 接口:
export const apiDuty = `[${group.duty}] ${api}:`; // eg.[责任部门（或责任人）] 接口:

// 字段类型
export const typeNumber = `[${fieldType}: ${number}]`; // eg.[字段类型: Number]
export const typeString = `[${fieldType}: ${string}]`; // eg.[字段类型: String]
export const typeBoolean = `[${fieldType}: ${boolean}]`; // eg.[字段类型: Boolean]
export const typeArray = `[${fieldType}: ${array}]`; // eg.[字段类型: Array]
export const typeObject = `[${fieldType}: ${object}]`; // eg.[字段类型: Object]
export const typeUnix13 = 1524032521415;

// 字段定义
const fields = {
  createAt: typeUnix13,
  updateAt: typeUnix13,
  detail: '详情',
  city: `省份/城市 ${typeString} eg.四川/成都`,
  description: `备注说明 ${typeString} ps:${wordLimit}`,
  // 燃气用户
  user: '燃气用户',
  userName: `用户姓名 ${typeString}`,
  cardId: `卡号 ${typeString}`,
  address: `详细地址 ${typeString}`,
  // 价格
  price: `价格(元) ${typeString}`,
  priceType: `价格类型 ${typeNumber} 0:后付费 1:预付费`,
  priceHistory: '历史价格记录',
  priceValue: `历史价格金额(元) ${typeNumber} eg. 2.84`,
  priceVersion: `价格版本 ${typeString}`,
  priceStatus: `价格状态 ${typeNumber} 0:异常 1:正常`,
  priceEndAt: `${typeUnix13}`,
  // 扩频表
  spread: '扩频表',
  spreadCode: `表编号 ${typeString}`,
  companyCode: `公司编码 ${typeString}`,
  company: '海力智能燃气示范公司',
  scanMethod: `扫频方式 ${typeNumber} 0:手动 1:自动`,
  extractStatus: `数据提取状态 ${typeNumber} 0:失败 1:成功`,
  batteryStatus: `电池状态 ${typeNumber} 0:消耗过大 1:正常 2:消耗过快`,
  remainVoltage: `剩余电压 ${typeNumber}`,
  totalVoltage: `满电电压 ${typeNumber}`,
  useDuration: `已使用时长(小时) ${typeNumber} eg. 50`,
  desigDuration: `理想使用时长(小时) ${typeNumber} eg. 3000`,
  tapStatus: `阀门状态 ${typeNumber} 0:异常 1:开启 2:关闭`,
  tapControl: `阀门控制(指令执行后) ${typeNumber} 0:异常 1:开启 2:关闭`,
  sendStatus: `上报状态 ${typeNumber} 0:未上报 1:正常`,
  noSend: `未上报(次数) ${typeNumber}`,
  finishedSend: `已上报(次数) ${typeNumber}`,
  sendUpdateAt: `${typeUnix13}`,
  // 集中器
  concentrator: '集中器',
  concentratorCode: `集中器编号 ${typeString}`,
  cardStatus: `通信卡状态 ${typeNumber} 0:异常 1:正常`,
  factNum: `实际挂表数 ${typeNumber} eg. 53`,
  totalNum: `全部表数 ${typeNumber} eg. 200`,
  setupAddress: `安装地址 ${typeString} eg. 二仙桥崔家店路天空城`,
  // 物联网表
  nblot: '物联网表',
  nblotCode: `表编号 ${typeString}`,
  onLineStatus: `在线状态 ${typeNumber} 0:已离线 1:在线`,
  uploadStatus: `数据上传状态 ${typeNumber} 0:失败 1:成功`,
  // 责任部门（或责任人）
  duty: '责任部门（或责任人）',
  department: `部门 ${typeString}`,
  name: `姓名 ${typeString}`,
  phone: `办公电话 ${typeString}`,
  tel: `手机号码 ${typeString}`,
  email: `电子邮箱 ${typeString}`,
  // 指令
  directive: '指令',
  directiveCode: `指令编号 ${typeString}`,
  directiveType: `指令类型 ${typeString}`,
  directiveStatus: `指令状态 ${typeString} 0:异常 1:正常`,
  directiveDes: `指令描述 ${typeString} eg.用户已支付 / 费用已上表 等`,
  directiveStep: `指令阶段 从小标0开始 ${typeNumber}`,
  // 发货记录
  packageCode: `装箱编号 ${typeString}`,
  palletCode: `托盘编号 ${typeString}`,
  meterCode: `表具编号 ${typeString}`,
  expressCode: `快递公司编号 ${typeString}`,
  express: `快递公司名称 ${typeString}`,
  orderId: `发货单号 ${typeString}`,
  deliveryAt: `${typeUnix13}`,
  // 异常报警
  alarmNum: `报警次数 ${typeNumber}`,
  alarmStatus: `预警状态 ${typeNumber} 0:异常 1:正常`,
  alarmAt: `${typeUnix13}`,
  // 燃气公司运营
  sysName: 'HL-6',
  sysVersion: '6.5',
  getMethod: 1, // 0:静默定时 1:静默实时
  runStatus: 1, // 0:异常 1:正常
  ip: `IP地址 ${typeString}`,
  port: `端口号 ${typeString}`,
  mac: `MAC地址 ${typeString}`,
  sqlVersion: `数据库版本 ${typeString}`,
  sync: `数据库时间是否与服务器时间同步 ${typeBoolean} eg. true:同步 false:不同步`,
  readWrither: `读写器型号 ${typeString}`,
  otherDevices: `其他设备型号 ${typeString}`,
  dllVersion: `DLL文件版本 ${typeString}`,
  getDataAt: `${typeUnix13}`,
  // 登录用户信息（资料）
  userid: `登录用户编码 ${typeString}`,
  nickname: `用户昵称(界面显示) ${typeString}`,
  portrait: `头像地址 ${typeString}`,
  role: `用户权限 ${typeNumber}`,
  sex: `用户权限 ${typeNumber} eg. 0:女 1:男`,
};
export default fields;

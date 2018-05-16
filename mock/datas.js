import fields, { wordLimit, tagRequired, tagNoRequired } from './fields';

// 责任部门（或责任人）
const dutyCollection = {
  department: fields.department,
  name: fields.name,
  phone: fields.phone,
  tel: fields.tel,
  email: fields.email,
};
// 配置 传递的参数
// duty
export const dutyParams = {
  meterCode: {
    desc: fields.meterCode,
    exp: `${tagRequired} B000X0001`,
  },
  department: {
    desc: fields.department,
    exp: `${tagNoRequired} 技术中心(办公室)`,
  },
  name: {
    desc: fields.name,
    exp: `${tagNoRequired} 鱼子酱`,
  },
  phone: {
    desc: fields.phone,
    exp: `${tagNoRequired} 028-12345678`,
  },
  tel: {
    desc: fields.tel,
    exp: `${tagNoRequired} 13912345678`,
  },
  email: {
    desc: fields.email,
    exp: `${tagNoRequired} example123@qq.com`,
  },
};
// business
export const businessParams = {
  // 燃气公司
  companyCode: {
    desc: fields.companyCode,
    exp: '海力智能燃气示范公司',
  },
  description: {
    desc: fields.description,
    exp: `(${wordLimit})`,
  },
  // 系统详细
  sysName: {
    desc: fields.sysName,
    exp: 'HL-6',
  },
  sysVersion: {
    desc: fields.sysVersion,
    exp: '6.5',
  },
  getMethod: {
    desc: fields.getMethod,
    exp: '0:静默定时 1:静默实时',
  },
  ip: {
    desc: fields.ip,
    exp: '192.168.5.100',
  },
  port: {
    desc: fields.port,
    exp: '8080',
  },
  mac: {
    desc: fields.mac,
    exp: '00-00-00-00-00-00-00-E0',
  },
  sqlVersion: {
    desc: fields.sqlVersion,
    exp: 'MySQL 7.0',
  },
  readWrither: {
    desc: fields.readWrither,
    exp: 'RW-1.0',
  },
  otherDevices: {
    desc: fields.otherDevices,
    exp: '',
  },
  dllVersion: {
    desc: fields.dllVersion,
    exp: 'DLL-1.1.0',
  },
};
// 指令集
const directiveCollection = [
  {
    directiveCode: fields.directiveCode,
    directiveType: fields.directiveType,
    directiveStatus: fields.directiveStatus,
    directiveDes: fields.directiveDes,
    directiveStep: fields.directiveStep,
    createAt: `指令生成时间 ${fields.createAt}`,
    updateAt: `指令到达时间 ${fields.updateAt}`,
  },
];

// 扩频表
export const spreadData = [
  {
    spreadCode: fields.spreadCode,
    companyCode: fields.companyCode,
    concentratorCode: fields.concentratorCode,
    company: fields.company,
    scanMethod: fields.scanMethod,
    extractStatus: fields.extractStatus,
    price: fields.price,
    priceType: fields.priceType,
    priceVersion: fields.priceVersion,
    priceStatus: fields.priceStatus,
    priceUpdateAt: `调价时间 ${fields.updateAt}`,
    priceEndAt: fields.priceEndAt,
    batteryStatus: fields.batteryStatus,
    remainVoltage: fields.remainVoltage,
    totalVoltage: fields.totalVoltage,
    useDuration: fields.useDuration,
    desigDuration: fields.desigDuration,
    tapStatus: fields.tapStatus,
    tapControl: fields.tapControl,
    sendStatus: fields.sendStatus,
    noSend: fields.noSend,
    finishedSend: fields.finishedSend,
    sendUpdateAt: fields.sendUpdateAt,
    [`priceHistory: ${fields.priceHistory}`]: [
      {
        priceValue: fields.priceValue,
        updateAt: `调价时间 ${fields.updateAt}`,
      },
    ],
    // [`duty: '${fields.duty}'`]: dutyCollection,
    [`directive: '${fields.directive}'`]: directiveCollection,
    [`user: ${fields.user}`]: {
      userName: fields.userName,
      cardId: fields.cardId,
      address: fields.address,
    },
    createAt: `创建时间 ${fields.createAt}`,
    updateAt: `更新时间 ${fields.updateAt}`,
  },
];

// 集中器
export const concentratorData = [
  {
    concentratorCode: fields.concentratorCode,
    companyCode: fields.companyCode,
    company: fields.company,
    factNum: fields.factNum,
    totalNum: fields.totalNum,
    cardStatus: fields.cardStatus,
    onLineStatus: fields.onLineStatus,
    setupAddress: fields.setupAddress,
    createAt: `创建时间 ${fields.createAt}`,
    updateAt: `更新时间 ${fields.updateAt}`,
  },
];

// 物联网表
export const nblotData = [
  {
    nblotCode: fields.nblotCode,
    companyCode: fields.companyCode,
    company: fields.company,
    onLineStatus: fields.onLineStatus,
    extractStatus: fields.extractStatus,
    price: fields.price,
    priceType: fields.priceType,
    priceVersion: fields.priceVersion,
    priceStatus: fields.priceStatus,
    priceUpdateAt: `调价时间 ${fields.updateAt}`,
    priceEndAt: fields.priceEndAt,
    batteryStatus: fields.batteryStatus,
    remainVoltage: fields.remainVoltage,
    totalVoltage: fields.totalVoltage,
    useDuration: fields.useDuration,
    desigDuration: fields.desigDuration,
    tapStatus: fields.tapStatus,
    tapControl: fields.tapControl,
    sendStatus: fields.sendStatus,
    noSend: fields.noSend,
    finishedSend: fields.finishedSend,
    sendUpdateAt: fields.sendUpdateAt,
    [`priceHistory: ${fields.priceHistory}`]: [
      {
        priceValue: fields.priceValue,
        updateAt: `调价时间 ${fields.updateAt}`,
      },
    ],
    // [`duty: '${fields.duty}'`]: dutyCollection,
    [`directive: '${fields.directive}'`]: directiveCollection,
    [`user: ${fields.user}`]: {
      userName: fields.userName,
      cardId: fields.cardId,
      address: fields.address,
    },
    createAt: `创建时间 ${fields.createAt}`,
    updateAt: `更新时间 ${fields.updateAt}`,
  },
];

// 责任部门（或责任人）
export const dutyData = [dutyCollection];

// 发货记录
export const shippingData = [
  {
    meterCode: fields.meterCode,
    companyCode: fields.companyCode,
    expressCode: fields.expressCode,
    company: fields.company,
    express: fields.express,
    orderId: fields.orderId,
    deliveryAt: `创建时间 ${fields.deliveryAt}`,
    createAt: `创建时间 ${fields.createAt}`,
    updateAt: `更新时间 ${fields.updateAt}`,
  },
];

// 异常报警
export const unusualData = [
  {
    meterCode: fields.meterCode,
    companyCode: fields.companyCode,
    company: fields.company,
    alarmNum: fields.alarmNum,
    alarmStatus: fields.alarmStatus,
    alarmAt: fields.alarmAt,
    // [`duty: '${fields.duty}'`]: dutyCollection,
    [`directive: '${fields.directive}'`]: directiveCollection,
  },
];

// 燃气公司运营
export const businessCompanyData = [
  {
    companyCode: fields.companyCode,
    company: fields.company,
    city: fields.city,
    description: fields.description,
    [`detail ${fields.detail}`]: {
      sysName: fields.sysname,
      sysVersion: fields.sysversion,
      getMethod: fields.getMethod,
      runStatus: fields.runStatus,
      ip: fields.ip,
      port: fields.port,
      mac: fields.mac,
      sqlVersion: fields.sqlVersion,
      sync: fields.sync,
      readWrither: fields.readWrither,
      otherDevices: fields.otherDevices,
      dllVersion: fields.dllVersion,
      getDataAt: fields.getDataAt,
    },
    createAt: `创建时间 ${fields.createAt}`,
    updateAt: `更新时间 ${fields.updateAt}`,
  },
];

// 登录用户信息（资料）
export const userData = [
  {
    userid: fields.userid,
    nickname: fields.nickname,
    portrait: fields.portrait,
    role: fields.role,
    sex: fields.sex,
    tel: fields.tel,
    email: fields.email,
    createAt: `创建时间 ${fields.createAt}`,
    updateAt: `更新时间 ${fields.updateAt}`,
  },
];

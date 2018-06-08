import { IDataParse, IMonitorParse, INewParse, IParse } from '../../global';
import { parseDataValue } from './parse';

export const parseResponse: IParse = params => {
  const { status, message, extData } = params;
  const count = extData.count || 0;
  const data = extData.data || [];

  return {
    status,
    message,
    count,
    data,
  };
};

export const parseNewResponse: INewParse = params => ({
  code: params.code,
  message: params.message || '',
  data: params.data || [],
});

export const parseMonitorResponse: IMonitorParse = params => ({
  code: params.code,
  message: params.message || '',
  data: params.data.value || [],
  totalNum: params.data.totalNum,
});

// 根据传入的type 格式化data
export const parseData: IDataParse = (params, type = 'default') => {
  const value: parseDataValue = {
    code: 1,
    totalNum: 0,
    message: '解析数据错误',
    data: [],
  };
  const result = { value };

  // 默认
  if (type === 'default') {
    const fields = {
      code: params.code,
      totalNum: params.data.totalNum,
      message: params.message || '',
      data: [],
    };
    result.value = {
      ...fields,
      data: params.data.value || [],
    };
  }
  // 物联网表
  if (type === 'nblot') {
    const fields = {
      code: params.code,
      totalNum: params.data.totalNum,
      message: params.message || '',
      data: [],
    };
    // "nblotCode": "表编号 [字段类型: String]",
    // "companyCode": "公司编码 [字段类型: String]",
    // "company": "公司名称 [字段类型: String]",
    // "onLineStatus": "在线状态 [字段类型: Number] 0:已离线 1:在线",
    // "uploadStatus": "数据上传状态 [字段类型: Number] 0:失败 1:成功",
    // "price": "价格(元) [字段类型: String]",
    // "priceType": "价格类型 [字段类型: Number] 0:后付费 1:预付费",
    // "priceVersion": "价格版本 [字段类型: String]",
    // "priceStatus": "价格状态 [字段类型: Number] 0:异常 1:正常",
    // "priceUpdateAt": "调价时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415",
    // "priceEndAt": "有效期至 [字段类型: Unix 时间戳(13位)] eg. 1524032521415",
    // "batteryStatus": "电池状态 [字段类型: Number] 0:消耗过大 1:正常 2:消耗过快",
    // "remainVoltage": "剩余电压 [字段类型: Number]",
    // "totalVoltage": "满电电压 [字段类型: Number]",
    // "useDuration": "已使用时长(小时) [字段类型: Number] eg. 50",
    // "desigDuration": "理想使用时长(小时) [字段类型: Number] eg. 3000",
    // "tapStatus": "阀门状态 [字段类型: Number] 0:异常 1:开启 2:关闭",
    // "tapControl": "阀门控制(指令执行后) [字段类型: Number] 0:异常 1:开启 2:关闭",
    // "sendStatus": "上报状态 [字段类型: Number] 0:未上报 1:正常",
    // "noSend": "未上报(次数) [字段类型: Number]",
    // "finishedSend": "已上报(次数) [字段类型: Number]",
    // "sendUpdateAt": "上报时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415",
    // "priceHistory: 历史价格记录": [
    //   {
    //     "priceValue": "历史价格金额(元) [字段类型: Number] eg. 2.84",
    //     "updateAt": "调价时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415"
    //   }
    // ],
    // "directive: '指令'": [
    //   {
    //     "directiveCode": "指令编号 [字段类型: String]",
    //     "directiveType": "指令类型 [字段类型: String]",
    //     "directiveStatus": "指令状态 [字段类型: String] 0:异常 1:正常",
    //     "directiveDes": "指令描述 [字段类型: String] eg.用户已支付 / 费用已上表 等",
    //     "directiveStep": "指令阶段 从小标0开始 [字段类型: Number]",
    //     "createAt": "指令生成时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415",
    //     "updateAt": "指令到达时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415"
    //   }
    // ],
    // "user: 燃气用户": {
    //   "userName": "用户姓名 [字段类型: String]",
    //   "cardId": "卡号 [字段类型: String]",
    //   "address": "详细地址 [字段类型: String]"
    // },
    // "createAt": "创建时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415",
    // "updateAt": "更新时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415"
    result.value = {
      ...fields,
      data: params.data.value.reduce((arr, current, index) => {
        arr.push({
          fieldId: `${current.meterShipId || `FieldId${index}`}`,
          nblotCode: '表编号 [字段类型: String]',
          companyCode: '公司编码 [字段类型: String]',
          company: '公司名称 [字段类型: String]',
          onLineStatus: '在线状态 [字段类型: Number] 0:已离线 1:在线',
          uploadStatus: '数据上传状态 [字段类型: Number] 0:失败 1:成功',
          price: '价格(元) [字段类型: String]',
          priceType: '价格类型 [字段类型: Number] 0:后付费 1:预付费',
          priceVersion: '价格版本 [字段类型: String]',
          priceStatus: '价格状态 [字段类型: Number] 0:异常 1:正常',
          priceUpdateAt: '调价时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415',
          priceEndAt: '有效期至 [字段类型: Unix 时间戳(13位)] eg. 1524032521415',
          batteryStatus: '电池状态 [字段类型: Number] 0:消耗过大 1:正常 2:消耗过快',
          remainVoltage: '剩余电压 [字段类型: Number]',
          totalVoltage: '满电电压 [字段类型: Number]',
          useDuration: '已使用时长(小时) [字段类型: Number] eg. 50',
          desigDuration: '理想使用时长(小时) [字段类型: Number] eg. 3000',
          tapStatus: '阀门状态 [字段类型: Number] 0:异常 1:开启 2:关闭',
          tapControl: '阀门控制(指令执行后) [字段类型: Number] 0:异常 1:开启 2:关闭',
          sendStatus: '上报状态 [字段类型: Number] 0:未上报 1:正常',
          noSend: '未上报(次数) [字段类型: Number]',
          finishedSend: '已上报(次数) [字段类型: Number]',
          sendUpdateAt: '上报时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415',
          priceHistory: [
            {
              priceValue: '历史价格金额(元) [字段类型: Number] eg. 2.84',
              updateAt: '调价时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415',
            },
          ],
          directive: [
            {
              directiveCode: '指令编号 [字段类型: String]',
              directiveType: '指令类型 [字段类型: String]',
              directiveStatus: '指令状态 [字段类型: String] 0:异常 1:正常',
              directiveDes: '指令描述 [字段类型: String] eg.用户已支付 / 费用已上表 等',
              directiveStep: '指令阶段 从小标0开始 [字段类型: Number]',
              createAt: '指令生成时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415',
              updateAt: '指令到达时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415',
            },
          ],
          user: {
            userName: '用户姓名 [字段类型: String]',
            cardId: '卡号 [字段类型: String]',
            address: '详细地址 [字段类型: String]',
          },
          createAt: '创建时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415',
          updateAt: '更新时间 [字段类型: Unix 时间戳(13位)] eg. 1524032521415',
        });

        return arr;
      }, []),
    };
  }
  // 物联网表 -> 发货记录
  if (type === 'nblotShipping') {
    const fields = {
      code: params.code,
      totalNum: params.data.totalNum,
      message: params.message || '',
      data: [],
    };
    result.value = {
      ...fields,
      data: params.data.value.reduce((arr, current, index) => {
        arr.push({
          fieldId: `${current.meterShipId || `FieldId${index}`}`,
          meterCode: `${current.meterCode || ''}`,
          companyCode: `${current.companyCode || ''}`,
          expressCode: `${current.expressCode || ''}`,
          company: `${current.company || ''}`,
          express: `${current.express || ''}`,
          orderId: `${current.orderId || ''}`,
          deliveryAt: `${current.deliveryAt || ''}`,
          createAt: `${current.createAt || ''}`,
          updateAt: `${current.updateAt || ''}`,
          ICCID: `${current.ICCID || ''}`,
          intake: parseInt(`${current.intake || 0}`, 10),
          meterModel: parseInt(`${current.meterModel || 0}`, 10),
          meterShipId: `${current.meterShipId || ''}`,
          simNumber: `${current.simNumber || ''}`,
        });

        return arr;
      }, []),
    };
  }

  console.log(result.value, 'result.value');
  return result.value;
};

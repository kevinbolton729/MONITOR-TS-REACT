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
    // MeterType: '1';
    // appearType: '0';
    // appearValue: '-192';
    // batteryStatus: '0';
    // company: '四川省巴中欣恒天然气有限责任公司';
    // companyCode: '0A201543';
    // createAt: '1528294483';
    // iotMeterId: 69600;
    // isAlarmControlShade: '1';
    // isAlarmControlShardeOpen: '1';
    // isAlarmNow: '1';
    // isChangeBattery: '1';
    // isLimiteNotice: '1';
    // isOpenIntap: '1';
    // isOpenOuttap: '1';
    // isOpenSlant: '1';
    // limiteNotice: '-1';
    // maxAlarmTimes: '7';
    // price: '0';
    // priceType: '1';
    // priceVersion: '0';
    // remainVoltage: '6.2';
    // sendUpdateAt: '1167611019';
    // settleType: '3';
    // shadeAlarmTimes: '15';
    // signal: '0';
    // slantAlarmTimes: '15';
    // spreadCode: '81001475';
    // tapInAlarmTimes: '15';
    // tapOutAlarmTimes: '15';
    // tapStatus: '1';
    // totalAddMoney: '-1';
    // totalGasUsed: '-1';
    // totalVoltage: '6.2';
    // updateAt_All: '1528294483';
    // valveState: '1';
    result.value = {
      ...fields,
      data: params.data.value.reduce((arr, current, index) => {
        arr.push({
          fieldId: `${current.iotMeterId || `FieldId${index}`}`,
          nblotCode: `${current.spreadCode || ''}`,
          companyCode: `${current.companyCode || ''}`,
          company: `${current.company || ''}`,
          onLineStatus: 1,
          uploadStatus: 1,
          price: `${current.price || 0} [X]`,
          priceType: parseInt(`${current.priceType || 0}`, 10),
          priceVersion: `${current.priceVersion || ''} [X]`,
          priceStatus: 1,
          priceUpdateAt: '1524032521415',
          priceEndAt: '1524032521415',
          batteryStatus: parseInt(`${current.batteryStatus || 0}`, 10),
          remainVoltage: parseInt(`${current.remainVoltage || 0}`, 10),
          totalVoltage: parseInt(`${current.totalVoltage || 0}`, 10),
          useDuration: '50 [X]',
          desigDuration: '3000 [X]',
          tapStatus: parseInt(`${current.tapStatus || 0}`, 10),
          tapControl: 1,
          sendStatus: 1,
          noSend: '2 [X]',
          finishedSend: '5 [X]',
          sendUpdateAt: `${current.sendUpdateAt || ''}`,
          priceHistory: [
            {
              priceValue: 2.84,
              updateAt: '1524032521415',
            },
          ],
          directive: [
            {
              directiveCode: 'D00001 [X]',
              directiveType: '开户 [X]',
              directiveStatus: '1',
              directiveDes: '用户已支付 [X]',
              directiveStep: 2,
              createAt: '1524032521415',
              updateAt: '1524032521415',
            },
          ],
          user: {
            userName: '鱼子酱 [X]',
            cardId: '126000001 [X]',
            address: '四川省成都市成华区龙潭市同济路1号 [X]',
          },
          createAt: `${current.createAt || ''}`,
          updateAt: `${current.updateAt_All || ''}`,
          MeterType: parseInt(`${current.MeterType}`, 10),
          appearType: parseInt(`${current.appearType}`, 10),
          iotMeterId: `${current.iotMeterId || ''}`,
          isAlarmControlShade: `${current.isAlarmControlShade || ''}`,
          isAlarmControlShardeOpen: `${current.isAlarmControlShardeOpen || ''}`,
          isAlarmNow: `${current.isAlarmNow || ''}`,
          isChangeBattery: `${current.isChangeBattery || ''}`,
          isLimiteNotice: `${current.isLimiteNotice || ''}`,
          isOpenIntap: `${current.isOpenIntap || ''}`,
          isOpenOuttap: `${current.isOpenOuttap || ''}`,
          isOpenSlant: `${current.isOpenSlant || ''}`,
          limiteNotice: `${current.limiteNotice || ''}`,
          maxAlarmTimes: `${current.maxAlarmTimes || ''}`,
          settleType: `${current.settleType || ''}`,
          shadeAlarmTimes: `${current.shadeAlarmTimes || ''}`,
          signal: `${current.signal || ''}`,
          slantAlarmTimes: `${current.slantAlarmTimes || ''}`,
          tapInAlarmTimes: `${current.tapInAlarmTimes || ''}`,
          tapOutAlarmTimes: `${current.tapOutAlarmTimes || ''}`,
          totalAddMoney: `${current.totalAddMoney || ''}`,
          totalGasUsed: `${current.totalGasUsed || ''}`,
          valveState: `${current.valveState || ''}`,
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

  // console.log(result.value, 'result.value');
  return result.value;
};

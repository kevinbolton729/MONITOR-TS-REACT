/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-05 22:04:50
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-05-16 16:44:50
 */
import { message as openMessage } from 'antd';
import { routerRedux } from 'dva/router';
import md5 from 'js-md5';
// 声明
import { IFns } from '../global';
// 常量
import {
  API_DOMAIN,
  PAGELOGIN,
  SECRETKEY_USER,
  // LOCALSTORAGENAME,
  URL_PREFIX,
} from './consts';

// md5处理
export const setMd5: IFns['setMd5'] = pwd => {
  return md5(md5(pwd + SECRETKEY_USER) + SECRETKEY_USER);
};

// 格式化数字
const twoDecimal: IFns['twoDecimal'] = num => {
  // 显示数字，保留小数点后两位
  // 返回值的类型为String
  const f = parseFloat(num);

  if (!f) {
    return '0.00';
  }

  return (Math.floor(f * 100) / 100).toFixed(2);
};
export const parseNum: IFns['parseNum'] = value =>
  twoDecimal(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// 解析URL地址
export const parseUrl = (url: string) => {
  let newUrl = url;
  const httpIndexOf = newUrl && newUrl.indexOf('http');
  if (httpIndexOf === -1) {
    newUrl = `${API_DOMAIN}${newUrl}`;
  }
  return newUrl;
};

/**
 * 无限级数菜单
 * --- START ---
 * @description 生成无限级数菜单
 * @param {Array} firstMenus 一级菜单
 * @param {Array} [data=[]]  菜单数据
 */
export const getMenus: IFns['getMenus'] = (firstMenus, data = []) =>
  firstMenus.reduce((arr, current) => {
    const children = [];
    const obj = { ...current };
    children.push(...getChildMenus(current.sortId, data));
    if (children.length > 0) {
      obj.children = children;
    }
    arr.push(obj);
    return arr;
  }, []);
/**
 * @description 生成一级菜单
 * @param {Array} [data=[]]  菜单数据
 */
export const getFirstMenu: IFns['getFirstMenu'] = (data = []) =>
  data.reduce((arr, current) => {
    if (parseInt(current.sortPid, 10) === 0) {
      return arr.concat(current);
    }
    return arr;
  }, []);
/**
 * @description 生成下级菜单
 * @param {Array} [data=[]]  菜单数据
 */
export const getChildMenus: IFns['getChildMenus'] = (sortId, data = []) =>
  data.reduce((arr, current) => {
    const children = [];
    if (sortId === current.sortPid) {
      const obj = { ...current };
      children.push(...getChildMenus(current.sortId, data));
      if (children.length > 0) {
        obj.children = children;
      }
      arr.push(obj);
    }
    return arr;
  }, []);
// 字符串转换成大写
export const strToUpper: IFns['strToUpper'] = str => str.toString().toUpperCase();
// 获取图片Base64编码内容
export const getBase64: IFns['getBase64'] = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
// base64 to Blob
export const base64UrlToBlob: IFns['base64UrlToBlob'] = urlData => {
  // 去掉url的头，并转换为byte
  const bytes = window.atob(urlData.split(',')[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  ia.forEach((i, index) => {
    ia[index] = bytes.charCodeAt(index);
  });
  return new Blob([ia], {
    type: urlData
      .split(',')[0]
      .split(':')[1]
      .split(';')[0],
  });
};
// 过滤react-quill getContent()的内容，获取待上传的图片
export const getUploadImgs: IFns['getUploadImgs'] = (passArr = []) => {
  if (passArr.length === 0) return passArr;

  const newArr = passArr;

  const uploadImages = newArr.reduce((arr, current) => {
    if (current.insert.image) {
      const { image } = current.insert;
      // console.log(image, 'image');
      // 过滤掉网络图片的url
      if (image.indexOf('data:image') !== -1) {
        return arr.concat(base64UrlToBlob(image));
      }
    }
    return arr;
  }, []);

  // console.log(uploadImages, 'uploadImages');
  return uploadImages;
};
// 使用图片url 替换 Delta中base64 image
export const covertBase64toUrl: IFns['covertBase64toUrl'] = params => {
  const { data, contentOps } = params;
  // console.log(data, 'data');
  // console.log(contentOps, 'contentOps');

  let n = 0;
  for (const i of contentOps) {
    const { image } = contentOps[i].insert;
    if (image && image.indexOf('data:image') !== -1) {
      // console.log(image, 'image');
      contentOps[i].insert.image = URL_PREFIX + data[n].url;
      n += 1;
    }
  }

  // console.log(contentOps, 'new contentOps');
  return contentOps;
};
// 图片上传前
export const beforeUpload: IFns['beforeUpload'] = file => {
  const isIMG =
    file.type.indexOf('image/jpeg') !== -1 ||
    file.type.indexOf('image/gif') !== -1 ||
    file.type.indexOf('image/png') !== -1;
  const isLt = file.size / 1024 / 1024 < 1000;

  if (!isIMG) {
    openMessage.error('请上传格式为：JPG/GIF/PNG的图片!');
  }
  if (!isLt) {
    openMessage.error('请上传小于1000M的图片!');
  }

  return isIMG && isLt;
};
// 视频上传前
export const beforeUploadVideo: IFns['beforeUploadVideo'] = file => {
  const isMp4 = file.type.indexOf('video/mp4') !== -1;
  const isLt = file.size / 1024 / 1024 < 50;

  if (!isMp4) {
    openMessage.error('请上传格式为：MP4的视频!');
  }
  if (!isLt) {
    openMessage.error('请上传小于50M的视频!');
  }

  return isMp4 && isLt;
};
// --- END ---
// Dispatch Action
export const dispatchAction = (props: any, opts: { type: string; payload?: any }) => {
  const { dispatch } = props;
  opts.payload
    ? dispatch({ type: opts.type, payload: opts.payload })
    : dispatch({ type: opts.type });
};

// [models]
// Token失效时，提示并跳转至 /user/login
export const noToken: IFns['noToken'] = function*(params) {
  const { message, put } = yield params;

  yield openMessage.warn(message);
  // yield console.warn(message, 'no token message');
  yield put(routerRedux.push(PAGELOGIN));
};
// 跳转页面
export const gotoPage: IFns['gotoPage'] = function*(params) {
  const { url, key, put } = yield params;

  // yield console.log(key, 'key');
  yield put(routerRedux.push({ pathname: url, query: { key } }));
};

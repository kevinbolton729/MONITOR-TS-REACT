import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type ReturnString = IReturnTypes['string'];
type ReturnVoid = IReturnTypes['void'];

export interface ICompanyProps {
  loading: boolean;
  confirmLoading: boolean;
  companyList: any[];
  form: any;
}

export interface ICompanyStates {
  visible: boolean;
  isEditConfig: boolean;
  isClick: boolean;
  isFetch: boolean;
  modalSort: string;
  selectedRecord: any[];
  curPage: number;
  pageSize: number;
}

export interface ICompanyItems {}

import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type ReturnString = IReturnTypes['string'];
type ReturnVoid = IReturnTypes['void'];
type Dispatch = IProps['dispatch'];

export interface IBusinessProps {}

export interface IBusinessStates {}

export interface IBusinessItems {}

export interface ICustomProps {
  loading: boolean;
  dispatch: Dispatch;
  spreadList: any[];
  concentratorList: any[];
  shippingList: any[];
  nblotList: any[];
  nblotShippingList: any[];
  unusualSpreadList: any[];
  unusualNblotList: any[];
}

export interface ICustomStates {
  currentTab: string;
  currentRadio: string;
  currentTable: string;
}

export interface ICustomItems {
  tabChange(key: string): void;
}

export interface IDataMonitorProps {}

export interface IDataMonitorStates {
  currentTab: string;
  currentRadio: string;
  currentTable: string;
}

export interface IDataMonitorItems {}

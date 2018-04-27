import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type ReturnString = IReturnTypes['string'];
type ReturnVoid = IReturnTypes['void'];

export interface IBusinessProps {}

export interface IBusinessStates {}

export interface IBusinessItems {}

export interface ICustomProps {}

export interface ICustomStates {
  currentTab: string;
  currentRadio: string;
  currentTable: string;
}

export interface ICustomItems {
  tabChange(key: string): void;
}

export interface IDataMonitorProps {}

export interface IDataMonitorStates {}

export interface IDataMonitorItems {}

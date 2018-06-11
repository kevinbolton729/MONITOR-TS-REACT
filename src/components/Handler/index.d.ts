/// <reference types="react" />
import * as React from 'react';

export interface IDetailProps {
  sort?: string;
  form?: any;
  filterData?: any;
  resetData?: any;
  changeCity?: any;
  loading?: boolean;
  hideSearch?: boolean;
  hideDatePicker?: boolean;
  showSelectCity?: boolean;
}

export interface IDetailStates {
  [propName: string]: any;
}

export interface IDetailItem {}

/// <reference types="react" />
import * as React from 'react';

export interface IDetailProps {
  sort?: string;
  filterData?: any;
  form?: any;
  resetData?: any;
}

export interface IDetailStates {
  [propName: string]: any;
}

export interface IDetailItem {}

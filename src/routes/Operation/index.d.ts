import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type ReturnString = IReturnTypes['string'];
type ReturnVoid = IReturnTypes['void'];

export interface ICompanyProps {
  loading: boolean;
  companyList: any[];
}

export interface ICompanyStates {}

export interface ICompanyItems {}

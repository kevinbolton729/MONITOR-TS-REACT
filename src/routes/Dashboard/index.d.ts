import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type ReturnString = IReturnTypes['string'];
type ReturnVoid = IReturnTypes['void'];
type CurrentUser = IProps['currentUser'];
type Dispatch = IProps['dispatch'];

export interface IWorkProps {
  currentUser: CurrentUser;
  dispatch: Dispatch;
  lists: any;
  loading: boolean;
}

export interface IWorkStates {}

export interface IWorkItems {
  getShowDate: ReturnString;
}

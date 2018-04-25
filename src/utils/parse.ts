import { IParse } from '../global';

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

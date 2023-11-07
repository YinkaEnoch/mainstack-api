export interface RestHttpResponseInterface {
  code: number;
  status: string;
  message: string;
  data: any;
}

export function RestHttpResponse(
  message: string,
  data: any,
): RestHttpResponseInterface {
  return {
    code: 0,
    status: 'success',
    message,
    data,
  };
}

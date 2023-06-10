export enum ResponseState {
  failed = 0,
  success = 1,
}

export type ResponseData<T> = {
  state: ResponseState;
  data: T | null;
  error: string | null;
};

export function getFailedResponse(error: string) {
  return {
    state: ResponseState.failed,
    data: null,
    error,
  };
}

export function getSuccessResponse<T = any>(data?: T) {
  return {
    state: ResponseState.success,
    data: data || null,
    error: null,
  };
}

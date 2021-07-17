export interface INotification {
  title: string;
  message?: string;
  timeOut?: number;
  noTimeout?: boolean;
}

export interface ILoadingValue {
  current: number;
  total: number;
}

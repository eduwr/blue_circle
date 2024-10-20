export type ResponseError = {
  status: number;
  message: string;
};

export type ResponseSuccess<T> = {
  status: number;
  data: T;
};

export type PocketbaseError = {
  code: number;
  message: string;
  data: {
    [key: string]: {
      code: string;
      message: string;
    };
  };
}

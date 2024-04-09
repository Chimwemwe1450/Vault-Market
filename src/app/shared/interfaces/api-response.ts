export interface IApiResponse {
  filePath: any;

  message(message: any): unknown;
  image_url: string;

  success: true;
  info: {
    code: number;
    message: string;
    records: number;
    current_page: number;
    page_size: number;
    ruid: string;
  };
  data: Array<any>;
}

export interface ISuccessResponse {
  success: boolean;
  data: Record<string, any>;
}

export class ResponseFormatter {
  public static success(data: Record<string, any>): ISuccessResponse {
    return {
      success: true,
      data,
    };
  }
}

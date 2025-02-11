import { ApiError } from "./apiError.js";
import { ApiResponse } from "./apiRes.js";


export const globalErrorHandler = (error, req, res, next) => {
  // console.log(error);
  
  if (!(error instanceof ApiError)) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          false,
          null,
          error._message ?? error.message ?? "Internal Server Error"
        )
      );
  }
  res
    .status(error.statusCode)
    .json(new ApiResponse(error.statusCode,error.success, error.data, error.message));
};

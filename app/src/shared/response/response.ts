export const successResponse = <T>(statusCode: number, data: T) => ({
  statusCode,
  body: JSON.stringify(data),
});

export type FieldError = { field: string; message: string };

export const errorResponse = (
  statusCode: number,
  message: string,
  errors?: FieldError[]
) => ({
  statusCode,
  body: JSON.stringify({
    message,
    ...(errors ? { errors } : {}),
  }),
});
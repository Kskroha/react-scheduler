import { FC } from "react";
import { Merge } from "react-hook-form/dist/types";
import { FieldError, FieldErrorsImpl } from "react-hook-form/dist/types/errors";

interface IErrorAlert {
  errorType: Merge<FieldError, FieldErrorsImpl<{ value: string; label: string; }>> | undefined;
  className: string;
  message: string | undefined;
}

export const ErrorAlert: FC<IErrorAlert> = ({
  errorType,
  className,
  message,
}) => {
  return (
    <>
      {errorType && (
        <p className={className} role="alert">
          {message}
        </p>
      )}
    </>
  );
};

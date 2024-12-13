/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from "../interface/error";

const handleDuplicateIdError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "This name already used",
    errorSources,
  };
};

export default handleDuplicateIdError;

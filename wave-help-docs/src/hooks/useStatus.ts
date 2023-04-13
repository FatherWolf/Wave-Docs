import { useState } from "react";

export default function useStatus<T>() {
  return useState<Status<T>>({ type: "IDLE" });
}

interface Status_Base<Type extends string> {
  type: Type;
}

export interface IdleStatus extends Status_Base<"IDLE"> {}

export interface PendingStatus extends Status_Base<"PENDING"> {}

export interface FailureStatus extends Status_Base<"FAILURE"> {
  error: Error;
}

export interface SuccessStatus<T> extends Status_Base<"SUCCESS"> {
  result: T;
}

export type Status<T> = IdleStatus | PendingStatus | FailureStatus | SuccessStatus<T>;

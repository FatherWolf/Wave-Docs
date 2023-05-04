
import { promiseLog } from "../helpers/promise";
import { useEffect } from "react";
import useStatus, { Status, SuccessStatus } from "./useStatus";

/**
 * Creates a `Status` state from the promise creation function.
 * @param createPromise Make sure this function is not re-created, or the promise effect will fire again
 */
export default function usePromise<T>(createPromise: () => Promise<T>, label: string): [T | undefined, Status<T>] {
  const [status, setStatus] = useStatus<T>();

  useEffect(() => {
    promiseLog(createPromise(), label).then(
      (result: T) => {
        setStatus({ type: "SUCCESS", result });
      },
      (error: Error) => {
        setStatus({ type: "FAILURE", error });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPromise, setStatus]);

  return [(status as SuccessStatus<T>).result, status];
}

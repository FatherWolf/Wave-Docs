export async function promiseLog<T>(promise: Promise<T>, label: string): Promise<T> {
  try {
    console.log(`Start: ${label}`);
    const result = await promise;
    console.log(`Finish: ${label}`, result);
    return result;
  } catch (error) {
    console.error(`Error: ${label}: ${(error as Error).message}`, error);
    throw error;
  }
}

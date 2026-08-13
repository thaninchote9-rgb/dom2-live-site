type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export function fetchWithTimeout(
  input: RequestInfo | URL,
  init: NextFetchInit = {},
  timeoutMs = 4_000
) {
  return fetch(input, {
    ...init,
    signal: init.signal ?? AbortSignal.timeout(timeoutMs),
  });
}

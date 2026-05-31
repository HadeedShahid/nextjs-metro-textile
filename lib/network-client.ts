/**
 * Typed API response envelope — every request returns this shape, never throws.
 *
 * Usage:
 *   const { data, error, ok } = await apiClient.get<User>('/api/user/1')
 *   if (!ok) { handle(error); return; }
 *   console.log(data.name)
 */
export type ApiResponse<T = unknown> = {
  data: T | null;
  error: string | null;
  status: number;
  ok: boolean;
};

type ClientOptions = {
  /** Base URL prepended to every relative endpoint. */
  baseUrl?: string;
  /** Headers merged into every request. */
  headers?: Record<string, string>;
  /** Request timeout in ms. Defaults to 10 000. */
  timeout?: number;
};

class NetworkClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? "").replace(/\/$/, "");
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    this.timeout = options.timeout ?? 10_000;
  }

  // ---------------------------------------------------------------------------
  // Core
  // ---------------------------------------------------------------------------

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseUrl}${endpoint}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(url, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        ...(body !== undefined && { body: JSON.stringify(body) }),
        signal: controller.signal,
      });

      clearTimeout(timer);
      return await this.parseResponse<T>(res);
    } catch (err) {
      clearTimeout(timer);
      return this.handleError(err);
    }
  }

  private async parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
    const isJson = res.headers.get("content-type")?.includes("application/json");

    if (!isJson) {
      // e.g. 204 No Content or a plain-text error
      return res.ok
        ? { data: null, error: null, status: res.status, ok: true }
        : {
            data: null,
            error: `Request failed — ${res.status} ${res.statusText}`,
            status: res.status,
            ok: false,
          };
    }

    let json: any;
    try {
      json = await res.json();
    } catch {
      return {
        data: null,
        error: "Failed to parse server response",
        status: res.status,
        ok: false,
      };
    }

    if (!res.ok) {
      const message =
        json?.message ?? json?.error ?? json?.detail ?? `Error ${res.status}`;
      return { data: null, error: message, status: res.status, ok: false };
    }

    return { data: json as T, error: null, status: res.status, ok: true };
  }

  private handleError(err: unknown): ApiResponse<never> {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { data: null, error: "Request timed out", status: 408, ok: false };
    }
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { data: null, error: message, status: 0, ok: false };
  }

  // ---------------------------------------------------------------------------
  // Public methods
  // ---------------------------------------------------------------------------

  get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>("GET", endpoint, undefined, headers);
  }

  post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>("POST", endpoint, body, headers);
  }

  put<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>("PUT", endpoint, body, headers);
  }

  patch<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>("PATCH", endpoint, body, headers);
  }

  delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>("DELETE", endpoint, undefined, headers);
  }

  // ---------------------------------------------------------------------------
  // Factory — create a scoped child client with a different base or headers
  // ---------------------------------------------------------------------------

  withConfig(overrides: ClientOptions): NetworkClient {
    return new NetworkClient({
      baseUrl: overrides.baseUrl ?? this.baseUrl,
      headers: { ...this.defaultHeaders, ...overrides.headers },
      timeout: overrides.timeout ?? this.timeout,
    });
  }
}

// ---------------------------------------------------------------------------
// Singleton — use this everywhere in the app
// ---------------------------------------------------------------------------

export const apiClient = new NetworkClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
});

export { NetworkClient };

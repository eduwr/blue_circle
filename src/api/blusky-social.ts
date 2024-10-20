import type { Session } from "../schemas/session.ts";
const SOCIAL_BASE_URL = "https://bsky.social/xrpc";

type FetchOptions = {
  body: Record<string, unknown>;
  method: "get" | "post";
  headers: Record<string, string>;
  baseURL: string;
  redirect: boolean;
  session: Session;
};

export const fetchBsky = async (
  path: string,
  options: Partial<FetchOptions> = {}
) => {
  options.baseURL ??= SOCIAL_BASE_URL;
  options.method ??= "get";
  options.headers ??= {};
  options.redirect ??= true;

  options.headers["Authorization"] = `Bearer ${options.session?.accessJwt}`;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  } as const;

  const url = `${options.baseURL}/${path}`;
  return fetch(url, {
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    method: options.method,
    headers: new Headers(headers),
  });
};

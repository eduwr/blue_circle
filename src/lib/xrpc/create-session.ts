import { fetchBsky } from "../../api/blusky-social.ts";
import { sessionSchema, type Session } from "../../schemas/session.ts";
import type { ResponseError, ResponseSuccess } from "./response.type.ts";
import { ok, Result } from "crusty";
export type CreateSessionInput = {
  identifier: string;
  password: string;
};

export const createSession = async ({
  identifier,
  password,
}: CreateSessionInput): Promise<
  Result<ResponseSuccess<Session>, ResponseError>
> => {
  const response = await fetchBsky("com.atproto.server.createSession", {
    body: {
      identifier,
      password,
    },
    redirect: false,
    method: "post",
  });

  const data = await response.json();

  const sessionData = {
    did: data.did,
    accessJwt: data.accessJwt,
    refreshJwt: data.refreshJwt,
    service: data.didDoc.service,
  };

  return ok({
    status: response.status,
    data: sessionSchema.parse(sessionData),
  });
};

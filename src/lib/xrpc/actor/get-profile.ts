import { err, ok, Result } from "crusty";
import { ResponseError, ResponseSuccess } from "../response.type.ts";
import { profileSchema, type Profile } from "../../../schemas/profile.ts";
import { createSession } from "../create-session.ts";
import { fetchBsky } from "../../../api/blusky-social.ts";

type GetProfileProps = {
  identifier: string;
};
export const getProfile = async ({
  identifier,
}: GetProfileProps): Promise<
  Result<ResponseSuccess<Profile>, ResponseError>
> => {
  const sessionResponse = await createSession({
    identifier: "eduardo.guru",
    password: "1234556",
  });

  if (!sessionResponse.ok) {
    return err({
      message: "could not get session",
      status: 400,
    });
  }

  const session = sessionResponse.value.data;
  const params = new URLSearchParams({
    actor: identifier,
  });
  const url = `app.bsky.actor.getProfile?${params.toString()}`;
  const response = await fetchBsky(url, { session });

  if (!response.ok) {
    return err({
      status: response.status,
      message: (() => {
        const { status } = response;
        if (status === 404) {
          return "profile not found";
        }
        if (status === 401) {
          return "unauthorized";
        }
        return "internal server error";
      })(),
    });
  }
  const data = await response.json();

  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return err({
      status: 500,
      message: "internal server error",
    });
  }

  return ok({
    status: response.status,
    data: parsed.data,
  });
};

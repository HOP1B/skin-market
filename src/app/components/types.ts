import { Prisma } from "@prisma/client";

export type Listing = Prisma.SkinListingGetPayload<{
  include: {
    skin: true;
  };
}>;

export type UserSkin = Prisma.UserSkinGetPayload<{
  include: {
    skin: true;
  };
}>;

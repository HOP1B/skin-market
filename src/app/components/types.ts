import { Prisma } from "@prisma/client";

export type Listing = Prisma.SkinListingGetPayload<{
  include: {
    skin: true;
  };
}>;
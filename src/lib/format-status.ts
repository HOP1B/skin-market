import { Status } from "@prisma/client";

export const formatStatus = (status: Status) => {
  let result = "invalid";
 switch (status) {
   case Status.BATTLE_SCARED:
     result = "BS";
     break;
   case Status.FACTORY_NEW:
     result = "FN";
     break;
   case Status.FIELD_TESTED:
     result = "FT";
     break;
   case Status.MINIMAL_WEAR:
     result = "MW";
     break;
   case Status.WELL_WORN:
     result = "WW";
     break;

 }
  return result;
};

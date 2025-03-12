-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('KNIFE', 'PISTOL', 'SMG', 'HEAVY', 'RIFLE');

-- CreateEnum
CREATE TYPE "Item" AS ENUM ('GLOCK_18', 'USP_S', 'P2000', 'P250', 'FIVE_SEVEN', 'CZ75_AUTO', 'TEC_9', 'DESERT_EAGLE', 'R8_REVOLVER', 'DUAL_BERETTAS', 'MAC_10', 'MP9', 'MP7', 'MP5_SD', 'UMP_45', 'P90', 'PP_BIZON', 'GALIL_AR', 'FAMAS', 'AK_47', 'M4A4', 'M4A1_S', 'AUG', 'SG_553', 'SSG_08', 'AWP', 'G3SG1', 'SCAR_20', 'NOVA', 'XM1014', 'SAWED_OFF', 'MAG_7', 'M249', 'NEGEV', 'BAYONET', 'FLIP_KNIFE', 'GUT_KNIFE', 'KARAMBIT', 'M9_BAYONET', 'HUNTSMAN_KNIFE', 'FALCHION_KNIFE', 'BOWIE_KNIFE', 'BUTTERFLY_KNIFE', 'SHADOW_DAGGERS', 'PARACORD_KNIFE', 'SURVIVAL_KNIFE', 'NOMAD_KNIFE', 'SKELETON_KNIFE', 'CLASSIC_KNIFE', 'TALON_KNIFE', 'URSUS_KNIFE', 'NAVAJAKNIFE', 'STILETTO_KNIFE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FACTORY_NEW');

-- CreateTable
CREATE TABLE "Skin" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "skinname" TEXT NOT NULL,
    "itemtype" "ItemType" NOT NULL,
    "item" "Item" NOT NULL,

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkinListing" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skinId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkinListing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SkinListing" ADD CONSTRAINT "SkinListing_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

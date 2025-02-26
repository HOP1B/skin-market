import Link from "next/link";

export const Filter = () => {
  return (
    <div className="w-[365px] bg-[#2a2c2e] rounded-md">
      <div className="min-h-12 flex justify-center items-center text-white px-6 mb-4 border-b-2 border-[#35373a] font-medium">
        Filters
      </div>
      <div className="pt-2 px-5">
        <div className="border-b border-[#35373a80] py-5">
          <div className="text-white text-sm font-medium">Price</div>
          <form className="flex justify-between pt-3">
            <input
              type="text"
              placeholder="From"
              className="bg-[#35373a] font-medium px-2 h-12 placeholder-white rounded-md w-[158px] text-white"
            />
            <input
              type="text"
              placeholder="To"
              className="bg-[#35373a] font-medium px-2 h-12 placeholder-white rounded-md w-[158px] text-white"
            />
          </form>
        </div>
        <div className="border-b border-[#35373a80] py-5">
          <div className="text-white text-sm font-medium">Exterior</div>
          <form className="pt-3">
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                All
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Factory New
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Minimal Wear
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Field-Tested
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Well-Worm
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Battle-Scared
              </Link>
            </div>
          </form>
        </div>
        <div className="border-b border-[#35373a80] py-5">
          <div className="text-white text-sm font-medium">Items category</div>
          <form className="pt-3">
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                All
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Knifes
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Rifles
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Sniper Rifles
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Pistols
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                SMG
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Shotguns
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Machine guns
              </Link>
            </div>
            <div className="flex gap-3 py-1">
              <input type="checkbox" />
              <Link href={""} className="text-white">
                Equipment
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

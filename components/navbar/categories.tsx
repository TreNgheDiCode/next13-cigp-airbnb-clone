"use client";

import Container from "../container";
import { TbBeach } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbMountain, TbPool } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import CategoryBox from "../category-box";
import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";

export const categories = [
  {
    label: "Bãi biển",
    icon: TbBeach,
    description: "Gần bãi biển",
  },
  {
    label: "Cối xay gió",
    icon: GiWindmill,
    description: "Có cối xay gió",
  },
  {
    label: "Hiện đại",
    icon: MdOutlineVilla,
    description: "Hiện đại",
  },
  {
    label: "Thị trấn",
    icon: TbMountain,
    description: "Trong thị trấn",
  },
  {
    label: "Hồ bơi",
    icon: TbPool,
    description: "Có hồ bơi",
  },
  {
    label: "Đảo",
    icon: GiIsland,
    description: "Trên đảo",
  },
  {
    label: "Hồ",
    icon: GiBoatFishing,
    description: "Gần hồ",
  },
  {
    label: "Trượt ván",
    icon: FaSkiing,
    description: "Hoạt động trượt ván",
  },
  {
    label: "Thành cổ",
    icon: GiCastle,
    description: "Trong cổ thành",
  },
  {
    label: "Cắm trại",
    icon: GiForestCamp,
    description: "Hoạt động cắm trại",
  },
  {
    label: "Vùng tuyết",
    icon: BsSnow,
    description: "Nơi có tuyết rơi",
  },
  {
    label: "Hang động",
    icon: GiCaveEntrance,
    description: "Trong hang động",
  },
  {
    label: "Sa mạc",
    icon: GiCactus,
    description: "Trên sa mạc",
  },
  {
    label: "Trang trại",
    icon: GiBarn,
    description: "Trong trang trại",
  },
  {
    label: "Sang trọng",
    icon: IoDiamond,
    description: "Nơi ở sang trọng",
  },
];

const Categories = () => {
  const params = useSearchParams();

  const category = params?.get("category");

  const pathname = usePathname();

  const isMainPage = pathname == "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category == item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

"use client";

import { useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./menu-item";
import useModal from "@/hooks/use-register-modal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Tìm nơi ở qua Airbnb
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <div className="hidden md:block">
            <Avatar />
          </div>
          <div className="block md:hidden ">
            <AiOutlineMenu />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="Chuyến đi" />
                <MenuItem onClick={() => {}} label="Danh sách yêu thích" />
                <MenuItem onClick={() => {}} label="Chỗ ở của tôi" />
                <MenuItem onClick={() => {}} label="Hồ sơ thông tin" />
                <MenuItem onClick={() => {}} label="Tìm nơi ở qua Airbnb" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Đăng xuất" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => onOpen("login")} label="Đăng nhập" />
                <MenuItem onClick={() => onOpen("register")} label="Đăng ký" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

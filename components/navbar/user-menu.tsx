"use client";

import { useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import MenuItem from "./menu-item";
import useModal from "@/hooks/use-modal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen, onClose } = useModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return onOpen("login");
    }

    onOpen("rent");
  }, [currentUser, onOpen]);

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Tìm nơi ở qua Airbnb
        </div>
        <div
          onClick={toggleOpen}
          onMouseEnter={() => setIsOpen(true)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
          <div className="block md:hidden ">
            <AiOutlineMenu />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 text-sm">
          <div
            className="flex flex-col cursor-pointer"
            onMouseLeave={() => setIsOpen(false)}
          >
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="Chuyến đi" />
                <MenuItem onClick={() => {}} label="Danh sách yêu thích" />
                <MenuItem onClick={() => {}} label="Chỗ ở của tôi" />
                <MenuItem onClick={() => {}} label="Hồ sơ thông tin" />
                <MenuItem
                  onClick={() => onOpen("rent")}
                  label="Tìm nơi ở qua Airbnb"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Đăng xuất" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    onOpen("login");
                    setIsOpen(false);
                  }}
                  label="Đăng nhập"
                />
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

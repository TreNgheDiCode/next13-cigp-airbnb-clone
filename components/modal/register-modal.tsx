"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useRegisterModal from "@/hooks/use-register-modal";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../input/input";
import Button from "../button";

const RegisterModal = () => {
  const { onClose, onOpen, isOpen } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      setIsLoading(true);

      axios.post("/api/register", data).catch((error) => {
        toast.error(`${error}`);
      });

      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi dăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng đến với CIGP Airbnb"
        subtitle="Tạo tài khoản mới!"
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Tên người dùng"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Mật khẩu"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Tiếp tục với Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Tiếp tục với Facebook"
        icon={BsFacebook}
        onClick={() => {}}
      />
      <Button
        outline
        label="Tiếp tục với Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Đã có tài khoản?</div>
          <div
            onClick={onClose}
            className="text-rose-500 font-semibold cursor-pointer hover:underline"
          >
            Đăng nhập
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Đăng ký"
      actionLabel="Tiếp tục"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;

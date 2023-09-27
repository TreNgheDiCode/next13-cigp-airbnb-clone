"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import useModal from "@/hooks/use-modal";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../input/input";
import Button from "../button";

const RegisterModal = () => {
  const { onClose, type, isOpen, onOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const modalOpen = isOpen && type === "register";

  const nameValidate = {
    minLength: (value: any) => value.length >= 5,
    matchPattern: (value: any) => /^[a-zA-Z0-9_]+$/.test(value),
  };

  const emailValidate = {
    maxLength: (v: any) =>
      v.length <= 50 || "The email should have at most 50 characters",
    matchPattern: (v: any) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "Email address must be a valid address",
  };

  const {
    register,
    handleSubmit,
    reset,
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

      toast.success(`Đăng ký thành công`);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi dăng nhập");
    } finally {
      reset();
      router.refresh();
      onClose();
      setIsLoading(false);
    }
  };

  const toggle = useCallback(() => {
    onClose();
    onOpen("login");
  }, [onClose, onOpen]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng đến với CIGP Airbnb"
        subtitle="Tạo tài khoản mới!"
      />

      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        validate={emailValidate}
        required
      />
      <Input
        id="name"
        type="text"
        label="Tên người dùng"
        disabled={isLoading}
        register={register}
        errors={errors}
        validate={nameValidate}
        required
      />
      <Input
        id="password"
        type="password"
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
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Tiếp tục với Facebook"
        icon={BsFacebook}
        onClick={() => signIn("facebook")}
      />
      <Button
        outline
        label="Tiếp tục với Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Đã có tài khoản?</div>
          <div
            onClick={toggle}
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
      isOpen={modalOpen}
      title="Đăng ký"
      actionLabel="Đăng ký"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;

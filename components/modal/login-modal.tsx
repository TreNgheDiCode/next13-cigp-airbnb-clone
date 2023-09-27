"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useModal from "@/hooks/use-modal";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../input/input";
import Button from "../button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const { onClose, type, isOpen, onOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const modalOpen = isOpen && type === "login";

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
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Đăng nhập thành công");
        reset();
        onClose();
        router.refresh();
        setIsLoading(false);
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    onClose();
    onOpen("register");
  }, [onClose, onOpen]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng quay trở lại"
        subtitle="Vui lòng đăng nhập để tiếp tục"
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
          <div>Lần đầu trải nghiệm AirBnb?</div>
          <div
            onClick={toggle}
            className="text-rose-500 font-semibold cursor-pointer hover:underline"
          >
            Tạo tài khoản
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={modalOpen}
      title="Đăng nhập"
      actionLabel="Tiếp tục"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

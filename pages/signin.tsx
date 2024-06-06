/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import logo from "@/public/assets/logo.png";
import iconOn from "@/public/assets/icon_visibility_on.png";
import iconOff from "@/public/assets/icon_visibility_off.png";
import iconGoogle from "@/public/assets/icon_google.png";
import iconKakao from "@/public/assets/icon_kakao.png";
import { EIGHT_NUMBERS_REGEX, EMAIL_REGEX } from "@/utils/regex";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import instance from "@/lib/axios";

export default function signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [isVisibilityIcon, setIsVisibilityIcon] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const isRegexValid =
    EMAIL_REGEX.test(email.trim()) && EIGHT_NUMBERS_REGEX.test(password.trim());

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const router = useRouter();

  const handleformSubmit = async () => {
    try {
      const response = await instance.post("/auth/signIn", {
        email,
        password,
      });

      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.log("데이터 전송 실패", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegexValid) {
      handleformSubmit();
      router.push("/");
    } else {
      if (email === "") {
        setEmailError("이메일을 입력해주세요.");
      } else if (!EMAIL_REGEX.test(email.trim())) {
        setEmailError("잘못된 이메일 형식입니다.");
      }
      if (password === "") {
        setPasswordError("비밀번호를 입력해주세요.");
      } else if (!EIGHT_NUMBERS_REGEX.test(password.trim())) {
        setPasswordError("비밀번호를 8자 이상 입력해주세요.");
      }
    }
  };

  useEffect(() => {
    setIsDisabled(!isRegexValid);
  }, [email, password, isRegexValid]);

  const togglePasswordVisibility = () => {
    setIsVisibilityIcon(!isVisibilityIcon);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-40">
      <Link href="/">
        <div className="h-[66] w-[198px] md:h-[132px] md:w-[396px]">
          <Image src={logo} alt="logo" />
        </div>
      </Link>
      <div className="w-full px-4 md:px-8">
        <form
          onSubmit={handleLogin}
          noValidate
          className="flex w-full flex-col items-center justify-center lg:px-40"
        >
          <div className="relative my-4 flex w-full flex-col justify-center gap-2 lg:w-auto">
            <label htmlFor="email" className="text-lg font-bold text-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleEmailChange}
              className={`w-full rounded-xl bg-[--coolgray100] p-4 text-base text-gray-400 focus:outline-[--main] lg:w-[512px] ${
                emailError ? "border-2 border-red-500" : "border-none"
              }`}
            />
            {emailError && (
              <p className="ml-4 text-xs text-red-500">{emailError}</p>
            )}
          </div>
          <div className="relative my-4 flex w-full flex-col justify-center gap-2 lg:w-auto">
            <label
              htmlFor="password"
              className="text-lg font-bold text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type={isVisibilityIcon ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              onChange={handlePasswordChange}
              className={`w-full rounded-xl bg-[--coolgray100] p-4 text-base text-gray-400 focus:outline-[--main] lg:w-[512px] ${
                passwordError ? "border-2 border-red-500" : "border-none"
              }`}
            />
            <Image
              src={isVisibilityIcon ? iconOn : iconOff}
              alt="password icon"
              className="absolute right-[1rem] top-[3.2rem] h-6 w-6 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
            {passwordError && (
              <p className="ml-4 text-xs text-red-500">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full cursor-pointer rounded-[5rem] bg-[--btn4] px-5 py-3 text-white lg:w-[512px] ${
              !isDisabled && "bg-[--main]"
            }`}
            disabled={isDisabled}
          >
            로그인
          </button>
        </form>
      </div>
      <div className="w-full px-4 lg:w-[512px]">
        <div className="my-4 flex flex-row items-center justify-between rounded-xl bg-[--loginbg] p-4">
          <p className="text-main font-semibold">간편 로그인하기</p>
          <div className="flex flex-row gap-4">
            <a href="https://www.google.com/">
              <Image src={iconGoogle} alt="google" className="h-10 w-10" />
            </a>
            <a href="https://www.kakaocorp.com/page/">
              <Image src={iconKakao} alt="kakao" className="h-10 w-10" />
            </a>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p>판다마켓이 처음이신가요?</p>
          <Link href="/signup" className="text-[--main] underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

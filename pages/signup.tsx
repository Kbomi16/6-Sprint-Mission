/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import logo from "@/public/assets/logo.png";
import iconOn from "@/public/assets/icon_visibility_on.png";
import iconOff from "@/public/assets/icon_visibility_off.png";
import iconGoogle from "@/public/assets/icon_google.png";
import iconKakao from "@/public/assets/icon_kakao.png";
import { EIGHT_NUMBERS_REGEX, EMAIL_REGEX } from "@/utils/regex";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import instance from "@/lib/axios";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setpasswordConfirmation] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordConfirmationError, setpasswordConfirmationError] =
    useState<string>("");

  const [isVisibilityIcon, setIsVisibilityIcon] = useState<boolean>(false);
  const [isVisibilityIconConfirm, setIsVisibilityIconConfirm] =
    useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const isRegexValid =
    EMAIL_REGEX.test(email.trim()) &&
    EIGHT_NUMBERS_REGEX.test(password.trim()) &&
    nickname.trim() !== "" &&
    password === passwordConfirmation;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handlepasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setpasswordConfirmation(e.target.value);
    setpasswordConfirmationError("");
  };

  const router = useRouter();

  const handleformSubmit = async () => {
    try {
      const response = await instance.post(
        "/auth/signUp",
        {
          email,
          nickname,
          password,
          passwordConfirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
    } catch (error) {
      console.log({ email, nickname, password, passwordConfirmation });
      console.log("데이터 전송 실패", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegexValid) {
      handleformSubmit();
    } else {
      if (email === "") {
        setEmailError("이메일을 입력해주세요.");
      } else if (!EMAIL_REGEX.test(email.trim())) {
        setEmailError("잘못된 이메일 형식입니다.");
      }
      if (nickname === "") {
        setNicknameError("닉네임을 입력해주세요.");
      }
      if (password === "") {
        setPasswordError("비밀번호를 입력해주세요.");
      } else if (!EIGHT_NUMBERS_REGEX.test(password.trim())) {
        setPasswordError("비밀번호를 8자 이상 입력해주세요.");
      }
      if (passwordConfirmation === "") {
        setpasswordConfirmationError("비밀번호를 다시 한 번 입력해주세요.");
      } else if (password !== passwordConfirmation) {
        setpasswordConfirmationError("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  useEffect(() => {
    setIsDisabled(!isRegexValid);
  }, [email, nickname, password, passwordConfirmation, isRegexValid]);

  const togglePasswordVisibility = () => {
    setIsVisibilityIcon(!isVisibilityIcon);
  };

  const togglepasswordConfirmationVisibility = () => {
    setIsVisibilityIconConfirm(!isVisibilityIconConfirm);
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
              className={`bg-coolgray-100 focus:outline-main w-full rounded-xl p-4 text-base text-gray-400 lg:w-[512px] ${
                emailError ? "border-error border-2" : "border-none"
              }`}
            />
            {emailError && (
              <p className="errorMessage text-error ml-4 text-xs">
                {emailError}
              </p>
            )}
          </div>
          <div className="relative my-4 flex w-full flex-col justify-center gap-2 lg:w-auto">
            <label
              htmlFor="nickname"
              className="text-lg font-bold text-gray-700"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              onChange={handleNicknameChange}
              className={`bg-coolgray-100 focus:outline-main w-full rounded-xl p-4 text-base text-gray-400 lg:w-[512px] ${
                nicknameError ? "border-error border-2" : "border-none"
              }`}
            />
            {nicknameError && (
              <p className="errorMessage text-error ml-4 text-xs">
                {nicknameError}
              </p>
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
              type={isVisibilityIcon ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              id="password"
              onChange={handlePasswordChange}
              className={`bg-coolgray-100 focus:outline-main w-full rounded-xl p-4 text-base text-gray-400 lg:w-[512px] ${
                passwordError ? "border-error border-2" : "border-none"
              }`}
            />
            <Image
              src={isVisibilityIcon ? iconOn : iconOff}
              alt="password visibility off icon"
              className="absolute right-[1rem] top-[3.2rem] h-6 w-6 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
            {passwordError && (
              <p className="errorMessage text-error ml-4 text-xs">
                {passwordError}
              </p>
            )}
          </div>
          <div className="relative my-4 flex w-full flex-col justify-center gap-2 lg:w-auto">
            <label
              htmlFor="confirm_password"
              className="text-lg font-bold text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              type={isVisibilityIconConfirm ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              id="confirm_password"
              onChange={handlepasswordConfirmationChange}
              className={`bg-coolgray-100 focus:outline-main w-full rounded-xl p-4 text-base text-gray-400 lg:w-[512px] ${
                passwordConfirmationError
                  ? "border-error border-2"
                  : "border-none"
              }`}
            />
            <Image
              src={isVisibilityIconConfirm ? iconOn : iconOff}
              alt="password visibility off icon"
              className="absolute right-[1rem] top-[3.2rem] h-6 w-6 cursor-pointer"
              onClick={togglepasswordConfirmationVisibility}
            />
            {passwordConfirmationError && (
              <p className="errorMessage text-error ml-4 text-xs">
                {passwordConfirmationError}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`bg-btn-4 w-full cursor-pointer rounded-[5rem] px-5 py-3 text-white lg:w-[512px] ${
              !isDisabled && "bg-main"
            }`}
            disabled={isDisabled}
          >
            회원가입
          </button>
        </form>
      </div>
      <div className="w-full px-4 lg:w-[512px]">
        <div className="bg-loginbg my-4 flex flex-row items-center justify-between rounded-xl p-4">
          <p className="text-black">간편 로그인하기</p>
          <div className="flex flex-row gap-4">
            <Link href="https://www.google.com/">
              <Image src={iconGoogle} alt="google" className="h-10 w-10" />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image src={iconKakao} alt="kakao" className="h-10 w-10" />
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p>이미 회원이신가요?</p>
          <Link href="/signin" className="text-main underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

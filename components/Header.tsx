import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import logo_text from "../public/assets/logo_text.png";
import logo from "../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import icon_profile from "@/public/assets/icon_profile.png";

export default function Header() {
  const router = useRouter();

  const goToMain = () => router.push("/");

  const goToSignin = () => {
    router.push("/signin");
  };

  const pathName = router.pathname;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLogoutBoxVisible, setIsLogoutBoxVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  const handleProfileClick = () => {
    setIsLogoutBoxVisible(!isLogoutBoxVisible);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
    window.location.reload();
  };

  return (
    <div className="fixed top-0 z-50 flex h-16 w-full items-center justify-between gap-4 bg-white px-[24px] py-0 lg:gap-12 lg:px-48 lg:py-4">
      <div className="flex items-center gap-4">
        <div
          onClick={goToMain}
          className="flex cursor-pointer items-center justify-center"
        >
          <picture>
            <source
              srcSet={logo_text.src}
              media="(max-width: 768px)"
              width={81}
              height={40}
            />
            <Image src={logo} alt="로고" width={153} />
          </picture>
        </div>
        {accessToken && (
          <nav className="flex flex-row gap-2 text-lg font-bold md:gap-8">
            <Link
              href="/boards"
              className={`hover:text-[--main] ${
                pathName.includes("/boards") || pathName.includes("/addBoards")
                  ? "text-[--main]"
                  : ""
              }`}
            >
              자유게시판
            </Link>
            <Link
              href="/items"
              className={`hover:text-[--main] ${
                pathName === "/items" ? "text-[--main]" : ""
              }`}
            >
              중고마켓
            </Link>
          </nav>
        )}
      </div>
      {accessToken && (
        <Image
          src={icon_profile}
          alt="프로필"
          width={48}
          height={48}
          onClick={handleProfileClick}
          className="cursor-pointer"
        />
      )}
      {isLogoutBoxVisible && (
        <div className="absolute right-5 top-14 z-50 rounded-lg bg-white px-4 py-2 shadow-md lg:right-12 lg:top-3">
          <button
            className="text-gray-700 hover:text-[--main]"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      )}
      {!accessToken && (
        <button
          id="btn_small"
          onClick={goToSignin}
          className="inline-flex h-[42px] w-[128px] cursor-pointer items-center justify-center rounded-[0.5rem] border-none bg-[--btn1] px-[0.5rem] py-[1.5rem] text-white hover:bg-[--btn2]"
        >
          로그인
        </button>
      )}
    </div>
  );
}

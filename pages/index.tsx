import React from "react";
import img_home_top from "@/public/assets/img_home_top.png";
import img_home_01 from "@/public/assets/img_home_01.png";
import img_home_02 from "@/public/assets/img_home_02.png";
import img_home_03 from "@/public/assets/img_home_03.png";
import img_home_bottom from "@/public/assets/img_home_bottom.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="h-auto bg-[--bannerbg] pt-24">
        <div className="container mx-auto flex flex-col items-center justify-center md:flex-row">
          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
            <h1 className="my-4 text-[32px] font-bold leading-tight md:text-5xl">
              일상의 모든 물건을
              <span className="inline md:hidden lg:inline">
                <br />
              </span>
              거래해보세요
            </h1>
            <Link
              href="/items"
              className="mt-4 inline-block rounded-full bg-[--main] px-8 py-3 text-white md:mb-4"
            >
              구경하러 가기
            </Link>
          </div>
          <Image
            src={img_home_top}
            className="mt-8 h-auto w-full object-contain px-4 md:-mb-4 md:w-1/2 lg:mb-0"
            alt="메인이미지1"
          />
        </div>
      </section>

      <main className="flex flex-col items-center justify-center">
        <div className="my-16 flex flex-col items-center justify-center gap-20 md:my-40 md:flex-row">
          <Image
            src={img_home_01}
            alt="home1"
            className="h-auto w-full object-contain px-4 md:w-1/2"
          />
          <div className="flex flex-col gap-4 pl-8 text-left">
            <span className="text-lg text-[--main] md:text-xl">Hot item</span>
            <h1 className="text-2xl font-bold leading-tight md:text-5xl">
              인기상품을
              <span className="inline md:hidden lg:inline">
                <br />
              </span>
              확인해 보세요
            </h1>
            <p className="text-lg leading-snug text-gray-700 md:text-xl">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div className="my-16 flex flex-col items-center justify-center gap-20 md:my-40 md:flex-row-reverse">
          <Image
            src={img_home_02}
            alt="home2"
            className="h-auto w-full object-contain px-4 md:w-1/2"
          />
          <div className="flex flex-col gap-4 text-right md:pl-12 md:text-left">
            <span className="text-lg text-[--main] md:text-xl">Search</span>
            <h1 className="text-2xl font-bold leading-tight md:text-5xl">
              구매를 원하는
              <span className="inline md:hidden lg:inline">
                <br />
              </span>
              상품을 검색하세요
            </h1>
            <p className="text-lg leading-snug text-gray-700 md:text-xl">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>

        <div className="my-16 flex flex-col items-center justify-center gap-20 px-4 md:my-40 md:flex-row">
          <Image
            src={img_home_03}
            alt="home3"
            className="h-auto w-full object-contain px-2 md:w-1/2"
          />

          <div className="flex flex-col gap-4 pl-8 text-left md:pr-8">
            <span className="text-lg text-[--main] md:text-xl">Register</span>
            <h1 className="text-2xl font-bold leading-tight md:text-5xl">
              판매를 원하는
              <span className="inline md:hidden lg:inline">
                <br />
              </span>
              상품을 등록하세요
            </h1>
            <p className="text-lg leading-snug text-gray-700 md:text-xl">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </main>

      <section className="bg-[--bannerbg] py-20">
        <div className="container mx-auto flex flex-col items-center justify-center md:flex-row">
          <div className="text-center md:text-left">
            <h1 className="my-4 text-[32px] font-bold leading-tight md:text-5xl">
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h1>
          </div>
          <Image
            src={img_home_bottom}
            className="relative top-[5rem] mt-8 h-auto w-full object-contain md:mt-0 md:w-1/2"
            alt="메인이미지2"
          />
        </div>
      </section>
    </div>
  );
}

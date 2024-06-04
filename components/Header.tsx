import { useRouter } from 'next/router'
import React from 'react'
import logo_text from '../public/assets/logo_text.png'
import logo from '../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const router = useRouter()

  const goToMain = () => router.push('/')

  const goToSignin = () => {
    router.push('/signin')
  }

  const pathName = router.pathname

  return (
    <div className="fixed top-0 w-full flex justify-between items-center h-16 py-0 px-[24px] bg-white z-50 gap-4 lg:py-4 lg:px-48 lg:gap-12">
      <div
        onClick={goToMain}
        className="cursor-pointer flex items-center justify-center"
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
      <nav className="flex flex-row gap-2 flex-grow-3 text-lg font-bold md:gap-12">
        <Link
          href="/boards"
          className={`hover:text-[--main] ${
            pathName === '/boards' ? 'text-[--main]' : ''
          }`}
        >
          자유게시판
        </Link>
        <Link
          href="/items"
          className={`hover:text-[--main] ${
            pathName === '/items' ? 'text-[--main]' : ''
          }`}
        >
          중고마켓
        </Link>
      </nav>
      <button
        id="btn_small"
        onClick={goToSignin}
        className="bg-[--btn1] text-white border-none cursor-pointer inline-flex items-center justify-center h-[42px] rounded-[0.5rem] px-[0.5rem] py-[1.5rem] w-[128px] hover:bg-[--btn2]"
      >
        로그인
      </button>
    </div>
  )
}

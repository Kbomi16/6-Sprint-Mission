import React from 'react'
import icon_facebook from '@/public/assets/icon_facebook.png'
import icon_twitter from '@/public/assets/icon_twitter.png'
import icon_youtube from '@/public/assets/icon_youtube.png'
import icon_insta from '@/public/assets/icon_insta.png'
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full h-[160px] relative b-[0]">
      <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center">
        <p className="text-sm relative -left-[10rem] top-[1rem] md:text-base mb-4 md:mb-0 md:left-0 md:top-0">
          ©codeit - 2024
        </p>
        <div className="flex flex-row items-center md:justify-between md:gap-[20rem]">
          <div className="text-white flex space-x-4 mb-4 md:mb-0 relative -left-[5rem] top-2 items-center md:top-0 md:-left-0">
            <p className="text-sm md:text-base">
              <Link href="./privacy.html">Privacy Policy</Link>
            </p>
            <p className="text-sm md:text-base">
              <Link href="./faq.html">FAQ</Link>
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-5 h-5">
                <Image
                  src={icon_facebook}
                  alt="facebook"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link href="https://twitter.com/" target="_blank" rel="noreferrer">
              <div className="w-5 h-5">
                <Image
                  src={icon_twitter}
                  alt="twitter"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-5 h-5">
                <Image
                  src={icon_youtube}
                  alt="youtube"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-5 h-5">
                <Image
                  src={icon_insta}
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { getBestPosts } from '@/api/api'
import React, { useEffect, useState } from 'react'
import icon_medal from '@/public/assets/icon_medal.png'
import icon_favorite from '@/public/assets/icon_favorite.png'
import Image from 'next/image'
import formatDate from '@/utils/formatDate'

type BestPostsData = {
  id: number
  title: string
  content: string
  image?: string | null
  likeCount: number
  createdAt: string
  updatedAt: string
  writer: {
    id: number
    nickname: string
  }
}

type BestPostsProps = {
  initialBestPosts: BestPostsData[]
}

export async function getStaticProps() {
  try {
    const initialBestPosts = await getBestPosts({ pageSize: 3 })
    return {
      props: {
        initialBestPosts,
      },
    }
  } catch (error) {
    console.error('posts 가져오는데 문제 발생', error)
    return {
      props: {
        initialBestPosts: [],
      },
    }
  }
}

export default function BestPosts({ initialBestPosts }: BestPostsProps) {
  const [bestPosts, setBestPosts] = useState<BestPostsData[]>(initialBestPosts)
  const [pageSize, setPageSize] = useState(3)

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const data = await getBestPosts({ pageSize: pageSize })
        setBestPosts(data)
      } catch (error) {
        console.error('posts 가져오는데 문제 발생', error)
      }
    }

    fetchBestPosts()
  }, [pageSize, initialBestPosts])

  function getBestPostsPerPage(screenSize: string) {
    switch (screenSize) {
      case 'desktop':
        return 3
      case 'tablet':
        return 2
      case 'mobile':
        return 1
      default:
        return 3
    }
  }

  function handleMediaQueryChange() {
    if (typeof window !== 'undefined') {
      const mqlDesktop = window.matchMedia('(min-width: 1200px)')
      const mqlTablet = window.matchMedia(
        '(min-width: 768px) and (max-width: 1199px)'
      )

      const screenSize = mqlDesktop.matches
        ? 'desktop'
        : mqlTablet.matches
          ? 'tablet'
          : 'mobile'
      const bestPostsPerPage = getBestPostsPerPage(screenSize)
      setPageSize(bestPostsPerPage)

      return screenSize
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mqlDesktop = window.matchMedia('(min-width: 1200px)')
      const mqlTablet = window.matchMedia(
        '(min-width: 768px) and (max-width: 1199px)'
      )

      const mediaQueryListener = () => handleMediaQueryChange()

      mqlDesktop.addEventListener('change', mediaQueryListener)
      mqlTablet.addEventListener('change', mediaQueryListener)

      handleMediaQueryChange()

      return () => {
        mqlDesktop.removeEventListener('change', mediaQueryListener)
        mqlTablet.removeEventListener('change', mediaQueryListener)
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-start lg:mx-auto gap-6">
      {bestPosts &&
        bestPosts.map((post) => (
          <div
            className="w-[400px] h-[169px] bg-[var(--gray50)] rounded-[1rem] px-8 lg:w-full"
            key={post.id}
          >
            <div>
              <div className="inline-flex justify-center items-center bg-[var(--main)] h-[30px] w-[102px] rounded-b-[5rem]">
                <Image src={icon_medal} alt="메달" width={16} height={16} />
                <p className="text-white text-[16px]">Best</p>
              </div>
              <div className="flex justify-between items-center h-[80px] gap-[0.3rem]">
                <h3 className="m-0 p-0 font-bold">{post.title}</h3>
                {post.image && (
                  <div className="min-w-[72px] h-[72px] border-[1.5px] border-[var(--gray100)] bg-white flex items-center justify-center rounded-[0.3rem]">
                    <Image
                      src={post.image}
                      alt="포스트 이미지"
                      width={48}
                      height={48}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end mt-4">
                <div className="flex items-center justify-start gap-[0.2rem]">
                  <p className="text-[14px] text-[var(--gray600)]">
                    {post.writer.nickname}
                  </p>
                  <Image
                    src={icon_favorite}
                    alt="하트"
                    width={16}
                    height={16}
                  />
                  <p className="text-[14px] text-[var(--gray600)]">
                    {post.likeCount}
                  </p>
                </div>
                <p className="text-[14px] text-[var(--gray400)]">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

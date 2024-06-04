import { getPosts } from '@/api/api'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import icon_favorite from '@/public/assets/icon_favorite.png'
import img_profile from '@/public/assets/img_profile.png'
import icon_search from '@/public/assets/icon_search.png'
import icon_order from '@/public/assets/icon_order.png'
import icon_dropdown from '@/public/assets/icon_dropdown.png'
import formatDate from '@/utils/formatDate'

type PostsData = {
  id: number
  title: string
  content: string
  image: string
  likeCount: number
  createdAt: string
  updatedAt: string
  writer: {
    id: number
    nickname: string
  }
}

type PostsProps = {
  initialPosts: PostsData[]
}

export async function getStaticProps() {
  try {
    const initialPosts = await getPosts({ orderBy: 'recent', keyword: '' })
    return {
      props: {
        initialPosts,
      },
    }
  } catch (error) {
    console.error('posts 가져오는데 문제 발생', error)
    return {
      props: {
        initialPosts: [],
      },
    }
  }
}

export default function Posts({ initialPosts }: PostsProps) {
  const selectOptions = [
    { value: 'recent', label: '최신순' },
    { value: 'like', label: '좋아요순' },
  ]

  const [posts, setPosts] = useState<PostsData[]>(initialPosts)
  const [keyword, setKeyword] = useState('')
  const [isDropdownView, setDropdownView] = useState(false)
  const [order, setOrder] = useState(selectOptions[0].value)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts({
          orderBy: order,
          keyword: keyword,
        })
        console.log(data)

        setPosts(data)
      } catch (error) {
        console.error('posts 가져오는데 문제 발생:', error)
      }
    }
    fetchData()
  }, [order, keyword])

  const handleKeywordSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const toggleDropdown = () => {
    setDropdownView(!isDropdownView)
  }

  const selectOption = (value: string) => {
    setOrder(value)
    setDropdownView(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full relative">
          <div className="absolute left-4 top-[0.6rem]">
            <Image src={icon_search} alt="검색 아이콘" width={24} height={24} />
          </div>
          <input
            className="bg-[var(--coolgray100)] border-none h-[42px] rounded-[0.5rem] py-[0.8rem] px-[2.8rem] flex flex-grow flex-shrink-0 basis-auto focus:outline-none"
            placeholder="검색할 게시글 제목을 입력해주세요"
            onChange={handleKeywordSearch}
          />
        </div>
        <div
          className="relative w-[2rem] md:w-[8rem] h-[42px] border border-[var(--gray100)] flex justify-center items-center px-4 py-2 rounded-[0.5rem] cursor-pointer bg-white"
          onClick={toggleDropdown}
        >
          <picture className="flex items-center">
            <source
              srcSet={icon_order.src}
              media="(max-width: 768px)"
              className="w-[24px] h-[24px] md:hidden"
            />
            <span className="hidden md:inline">
              {selectOptions.find((option) => option.value === order)?.label}
            </span>
            <Image src={icon_dropdown} alt="드롭다운" width={24} height={24} />
          </picture>
          {isDropdownView && (
            <ul className="absolute w-max -left-[2.5rem] md:-left-0 md:w-full top-full bg-white z-50 list-none border border-[var(--gray100)] p-0 m-0 rounded-[0.5rem]">
              {selectOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => selectOption(option.value)}
                  className=" p-2 cursor-pointer text-center border-b-[var(--gray100)] hover:bg-[var(--gray100)]"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id} className="">
              <div className="w-full max-w-[1200px] pt-4 border-b-[1px] border-[var(--gray100)] pb-4">
                <div className="flex justify-between items-start h-[80px] gap-[0.3rem]">
                  <h3 className="m-0 p-0 font-bold">{post.title}</h3>
                  {post.image && (
                    <div className="w-[72px] h-[72px] border-[1.5px] border-[var(--gray100)] bg-white flex items-center justify-center p-4 rounded-[0.3rem]">
                      <Image
                        src={post.image}
                        alt="포스트 이미지"
                        width={48}
                        height={48}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[0.5rem]">
                    <Image
                      src={img_profile}
                      alt="프로필 이미지"
                      width={24}
                      height={24}
                    />
                    <p className="text-[var(--gray600)] text-[14px]">
                      {post.writer.nickname}
                    </p>
                    <p className="text-[var(--gray400)] text-[14px]">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-[0.2rem]">
                    <Image
                      src={icon_favorite}
                      alt="하트"
                      width={16}
                      height={16}
                    />
                    <p className="text-[var(--gray600)] text-[14px]">
                      {post.likeCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

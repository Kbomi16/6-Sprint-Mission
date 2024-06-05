import { getPosts } from "@/api/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon_favorite from "@/public/assets/icon_favorite.png";
import img_profile from "@/public/assets/img_profile.png";
import icon_search from "@/public/assets/icon_search.png";
import icon_order from "@/public/assets/icon_order.png";
import icon_dropdown from "@/public/assets/icon_dropdown.png";
import formatDate from "@/utils/formatDate";

type PostsData = {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
};

type PostsProps = {
  initialPosts: PostsData[];
};

export async function getStaticProps() {
  try {
    const initialPosts = await getPosts({ orderBy: "recent", keyword: "" });
    return {
      props: {
        initialPosts,
      },
    };
  } catch (error) {
    console.error("posts 가져오는데 문제 발생", error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
}

const selectOptions = [
  { value: "recent", label: "최신순" },
  { value: "like", label: "좋아요순" },
];

export default function Posts({ initialPosts }: PostsProps) {
  const [posts, setPosts] = useState<PostsData[]>(initialPosts);
  const [keyword, setKeyword] = useState("");
  const [isDropdownView, setDropdownView] = useState(false);
  const [order, setOrder] = useState(selectOptions[0].value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts({
          orderBy: order,
          keyword: keyword,
        });

        setPosts(data);
      } catch (error) {
        console.error("posts 가져오는데 문제 발생:", error);
      }
    };
    fetchData();
  }, [order, keyword]);

  const handleKeywordSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownView(!isDropdownView);
  };

  const selectOption = (value: string) => {
    setOrder(value);
    setDropdownView(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex w-full items-center justify-between">
          <div className="absolute left-4 top-[0.6rem]">
            <Image src={icon_search} alt="검색 아이콘" width={24} height={24} />
          </div>
          <input
            className="flex h-[42px] flex-shrink-0 flex-grow basis-auto rounded-[0.5rem] border-none bg-[var(--coolgray100)] px-[2.8rem] py-[0.8rem] focus:outline-none"
            placeholder="검색할 게시글 제목을 입력해주세요"
            type="search"
            onChange={handleKeywordSearch}
          />
        </div>
        <div
          className="relative flex h-[42px] w-[2rem] cursor-pointer items-center justify-center rounded-[0.5rem] border border-[var(--gray100)] bg-white px-4 py-2 md:w-[8rem]"
          onClick={toggleDropdown}
        >
          <picture className="flex items-center">
            <source
              srcSet={icon_order.src}
              media="(max-width: 768px)"
              className="h-[24px] w-[24px] md:hidden"
            />
            <span className="hidden md:inline">
              {selectOptions.find((option) => option.value === order)?.label}
            </span>
            <Image src={icon_dropdown} alt="드롭다운" width={24} height={24} />
          </picture>
          {isDropdownView && (
            <ul className="absolute -left-[2.5rem] top-full z-50 m-0 w-max list-none rounded-[0.5rem] border border-[var(--gray100)] bg-white p-0 md:-left-0 md:w-full">
              {selectOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => selectOption(option.value)}
                  className="cursor-pointer border-b-[var(--gray100)] p-2 text-center hover:bg-[var(--gray100)]"
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
              <div className="w-full max-w-[1200px] border-b-[1px] border-[var(--gray100)] pb-4 pt-4">
                <div className="flex h-[80px] items-start justify-between gap-[0.3rem]">
                  <h3 className="m-0 p-0 font-bold">{post.title}</h3>
                  {post.image && (
                    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[0.3rem] border-[1.5px] border-[var(--gray100)] bg-white p-4">
                      <Image
                        src={post.image}
                        alt="포스트 이미지"
                        width={48}
                        height={48}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[0.5rem]">
                    <Image
                      src={img_profile}
                      alt="프로필 이미지"
                      width={24}
                      height={24}
                    />
                    <p className="text-[14px] text-[var(--gray600)]">
                      {post.writer.nickname}
                    </p>
                    <p className="text-[14px] text-[var(--gray400)]">
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
                    <p className="text-[14px] text-[var(--gray600)]">
                      {post.likeCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

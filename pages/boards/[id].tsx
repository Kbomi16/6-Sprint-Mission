/* eslint-disable react-hooks/rules-of-hooks */
import { getPostsComments, getPostsDetail } from "@/api/api";
import React, { useState } from "react";
import icon_optionbar from "@/public/assets/icon_optionbar.png";
import Image from "next/image";
import icon_profile from "@/public/assets/icon_profile.png";
import icon_favorite from "@/public/assets/icon_favorite.png";
import formatDate from "@/utils/formatDate";
import { displayTime } from "./../../utils/displayTime";
import Link from "next/link";
import icon_back from "@/public/assets/icon_back.png";

type PostsData = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
};

type PostsCommentsData = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image?: string | null;
  };
};

type PostsProps = {
  post: PostsData;
  postComment: PostsCommentsData[];
};

export async function getServerSideProps(context: { params: { id: any } }) {
  const postId = context.params.id;
  try {
    const post = await getPostsDetail(postId);
    const postComment = await getPostsComments(postId);
    return {
      props: {
        post,
        postComment,
      },
    };
  } catch (error) {
    console.error("데이터 가져오기 실패", error);
    return {
      notFound: true,
      props: {
        postComment: [],
      },
    };
  }
}

export default function postDetail({ post, postComment }: PostsProps) {
  const [comment, setComment] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="m-[8rem_auto_2rem] w-full max-w-[1200px] px-4 md:m-[0] md:p-[8rem_5rem_5rem] lg:m-[0_auto_5rem]">
      <div className="flex items-start justify-between">
        <h3 className="m-0 p-0 text-xl font-bold">{post.title}</h3>
        <Image src={icon_optionbar} alt="옵션바" width={24} height={24} />
      </div>
      <div className="mb-4 flex items-center gap-2 border-b-2">
        <Image src={icon_profile} alt="프로필" width={24} height={24} />
        <p className="py-4 text-[14px] text-[var(--gray600)]">
          {post.writer.nickname}
        </p>
        <p className="text-[14px] text-[var(--gray400)]">
          {formatDate(post.createdAt)}
        </p>
        <div className="flex items-center justify-start gap-[0.2rem] border-l-2 pl-4">
          <Image src={icon_favorite} alt="하트" width={16} height={16} />
          <p className="text-[14px] text-[var(--gray600)]">{post.likeCount}</p>
        </div>
      </div>
      <p>{post.content}</p>
      <div className="mt-14 flex flex-col">
        <h3 className="mb-2 text-[20px] font-bold">댓글 달기</h3>
        <textarea
          onChange={handleInputChange}
          name="content"
          placeholder="댓글을 입력해주세요"
          className="w-full resize-none rounded-md border-none bg-[--coolgray100] px-3 py-2 text-sm focus:outline-[--main]"
          rows={5}
        />
        <button
          className={`float-right ml-auto mt-4 block h-[42px] items-center justify-center rounded-[0.5rem] border-none bg-[--btn1] px-6 py-[0.5rem] text-white ${comment ? "bg-[--main] hover:bg-[--btn2]" : "cursor-not-allowed bg-gray-300"}`}
        >
          등록
        </button>
      </div>
      <div className="mt-4 flex w-full flex-col">
        {postComment &&
          postComment.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 w-full border-b-2 border-b-[var(--gray100)]"
            >
              <div className="flex items-center justify-between">
                <div className="mb-4">{comment.content}</div>
                <Image
                  src={icon_optionbar}
                  alt="옵션바"
                  width={24}
                  height={24}
                />
              </div>
              <div className="mb-2 flex gap-4">
                {comment.writer.image ? (
                  <Image
                    src={comment.writer.image}
                    alt="프로필"
                    width={42}
                    height={42}
                  />
                ) : (
                  <Image
                    src={icon_profile}
                    alt="프로필"
                    width={42}
                    height={42}
                  />
                )}
                <div className="flex flex-col">
                  <p className="text-[14px] text-[var(--gray600)]">
                    {comment.writer.nickname}
                  </p>
                  <p className="text-[14px] text-[--gray400]">
                    {displayTime(comment.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Link
        href="/boards"
        className="m-[3rem_auto_0] flex w-[240px] items-center justify-center gap-2 rounded-[5rem] bg-[--main] px-4 py-3 text-[18px] text-white"
      >
        목록으로 돌아가기
        <Image src={icon_back} alt="돌아가기" width={24} height={24} />
      </Link>
    </div>
  );
}

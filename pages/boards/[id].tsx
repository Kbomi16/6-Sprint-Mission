import { getPostsComments, getPostsDetail } from "@/api/api";
import React from "react";

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
    console.log(postComment);
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
  if (!post || !postComment) {
    console.log(post);
    console.log(postComment);
    return <div className="pt-[10rem]">Loading...</div>;
  }

  return (
    <div className="pt-[10rem]">
      <h1>dkdkdk</h1>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div>
        {postComment &&
          postComment.map((comment) => (
            <div key={comment.id}>
              <div>{comment.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

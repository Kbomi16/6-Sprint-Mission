import React from 'react'
import BestPosts from '@/components/BestPosts'
import Posts from '@/components/Posts'

export default function boards() {
  return (
    <div className="w-full m-[8rem_auto_2rem] px-4 max-w-[1200px] md:m-[0] md:p-[8rem_5rem_5rem] lg:m-[0_auto_5rem]">
      <h3 className="font-bold text-[20px] mb-4">베스트 게시글</h3>
      <div className="flex justify-center mb-[3rem] w-full">
        <BestPosts initialBestPosts={[]} />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[20px] mb-4">게시글</h3>
        <button className="bg-[--btn1] text-white border-none cursor-pointer inline-flex items-center justify-center h-[42px] rounded-[0.5rem] px-[1rem] py-[0.5rem] hover:bg-[--btn2]">
          글쓰기
        </button>
      </div>
      <Posts initialPosts={[]} />
    </div>
  )
}

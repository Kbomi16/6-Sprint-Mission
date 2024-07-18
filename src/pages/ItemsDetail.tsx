/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductsComments, getProductsDetail } from '../api/api'
import { CommentNotFound } from '../components'
import icon_optionbar from '../assets/icon_optionbar.png'
import icon_back from '../assets/icon_back.png'
import icon_favorite from '../assets/icon_favorite.png'
import { displayTime } from '../utils/displayTime.ts'

type ItemData = {
  id: string
  name: string
  images: string[]
  price: number
  favoriteCount: number
  tags: string[]
  description: string
}

type CommentData = {
  map(
    arg0: (comment: any, index: any) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode
  length: number
  content: string
  createdAt: string
  writer: {
    image: string
    nickname: string
  }
}

function ItemsDetail() {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<ItemData | null>(null)
  const [content, setContent] = useState('')
  const [comments, setComments] = useState<CommentData | null>(null)

  const fetchData = async (id: string) => {
    const [itemData, commentsData] = await Promise.all([
      getProductsDetail(id),
      getProductsComments(id),
    ])
    setItem(itemData)
    setComments(commentsData)
  }

  useEffect(() => {
    if (id !== undefined) {
      fetchData(id)
    }
  }, [id])

  if (!item || !comments) {
    return <div>Loading...</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <div className="container mx-auto my-32 flex flex-col items-stretch justify-center px-8">
      <div className="detail mb-8 flex flex-col items-stretch justify-center md:flex-row md:gap-8">
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-80 w-80 rounded-lg shadow-sm md:h-96 md:w-96"
        />
        <div className="detail-description">
          <div className="detail-nav mb-4 flex items-center justify-between">
            <p className="detail-name text-2xl font-semibold">{item.name}</p>
            <img src={icon_optionbar} className="h-6 w-6 cursor-pointer"></img>
          </div>
          <h1 className="text-3xl font-bold">
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </h1>
          <div className="my-4 border-b border-gray-300"></div>
          <p className="detail-description mb-2 text-sm">상품소개</p>
          <p className="description mb-4 text-base">{item.description}</p>

          <p className="detail-tags mb-2 text-sm">상품 태그</p>
          <div className="tags mb-4 flex flex-wrap gap-4">
            {item.tags.map((tag, index) => (
              <div
                key={index}
                className="tag rounded-full bg-gray-50 px-4 py-2 text-gray-800"
              >
                #{tag}
              </div>
            ))}
          </div>
          <div className="favoriteCount flex w-fit cursor-pointer items-center gap-2 rounded-full border bg-white px-4 py-2 text-gray-800">
            <img src={icon_favorite} className="h-6 w-6" />
            {item.favoriteCount}
          </div>
        </div>
      </div>
      <div className="question mb-8 flex flex-col">
        <div className="mb-4 border-b border-gray-300"></div>
        <h5 className="mb-4 text-lg font-semibold">문의하기</h5>
        <textarea
          value={content}
          onChange={handleInputChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className="mb-4 w-full resize-none rounded-md border-none bg-coolgray-100 px-3 py-2 text-sm focus:outline-main"
          rows={5}
        />
        <button
          className="button-disabled self-end rounded bg-gray-400 px-6 py-2 text-white disabled:opacity-50"
          disabled
        >
          등록
        </button>
      </div>
      {comments.length === 0 ? (
        <CommentNotFound />
      ) : (
        <div className="comments flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div key={index}>
              <div className="usernav mb-4 flex items-center justify-between">
                <p>{comment.content}</p>
                <img
                  src={icon_optionbar}
                  className="h-6 w-6 cursor-pointer"
                ></img>
              </div>
              <div className="user mb-4 flex items-center gap-4">
                <img
                  src={comment.writer.image}
                  className="h-10 w-10 rounded-full"
                />
                <div className="user-info flex h-10 flex-col justify-between">
                  <p className="nickname text-sm font-semibold">
                    {comment.writer.nickname}
                  </p>
                  <p className="time text-xs text-gray-400">
                    {displayTime(comment.createdAt)}
                  </p>
                </div>
              </div>
              <div className="border-b border-gray-300"></div>
            </div>
          ))}
        </div>
      )}
      <div className="backtolist mt-12 flex justify-center">
        <Link to="/items">
          <button className="back flex items-center justify-center gap-2 rounded-full bg-main px-6 py-3 text-lg text-white">
            목록으로 돌아가기
            <img src={icon_back} className="h-6 w-6" />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ItemsDetail

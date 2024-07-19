/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getProductsComments,
  getProductsDetail,
  postProductsComments,
} from '../api/api'
import { CommentNotFound } from '../components'
import icon_optionbar from '../assets/icon_optionbar.png'
import icon_back from '../assets/icon_back.png'
import icon_favorite from '../assets/icon_favorite.png'
import { displayTime } from '../utils/displayTime.ts'
import { getUsersMe } from '../api/users/index.ts'

type ItemData = {
  id: string
  name: string
  images: string[]
  price: number
  favoriteCount: number
  tags: string[]
  description: string
  createdAt: string
  ownerId: number
}

type CommentData = {
  map(
    arg0: (comment: any, index: any) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode
  length: number
  content: string
  createdAt: string
  writer: {
    id: number
    image: string
    nickname: string
  }
}

function ItemsDetail() {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<ItemData | null>(null)
  const [content, setContent] = useState('')
  const [comments, setComments] = useState<CommentData | null>(null)
  const [myId, setMyId] = useState()
  const [isOptionBoxVisible, setIsOptionBoxVisible] = useState(false)

  const fetchProductDetail = async () => {
    try {
      if (!id) return
      const data = await getProductsDetail(id)
      setItem(data)
    } catch (error) {
      console.error('상품 가져오기 실패', error)
    }
  }

  const fetchProductComments = async () => {
    try {
      if (!id) return
      const data = await getProductsComments(id)
      setComments(data)
    } catch (error) {
      console.error('댓글 가져오기 실패', error)
    }
  }

  const fetchMyId = async () => {
    try {
      const data = await getUsersMe()
      console.log(data)
      setMyId(data.id)
    } catch (error) {
      console.error('사용자 id 가져오기 실패', error)
    }
  }

  useEffect(() => {
    fetchProductDetail()
    fetchProductComments()
    fetchMyId()
  }, [id])

  if (!item || !comments) {
    return <div>Loading...</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSubmitComment = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert('로그인이 필요합니다.')
      return
    }

    try {
      if (!id) return

      await postProductsComments(id, content, token)
      setContent('')
      fetchProductComments()
    } catch (error) {
      console.error('댓글 등록 실패', error)
    }
  }

  const handleOptionClick = () => {
    setIsOptionBoxVisible((prev) => !prev)
  }

  const handleEditComment = () => {}

  const handleDeleteComment = () => {}

  return (
    <div className="container mx-auto my-32 flex max-w-[1200px] flex-col items-stretch justify-center px-8">
      <div className="mb-8 flex flex-col items-stretch justify-center md:flex-row md:justify-between md:gap-8">
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-80 w-80 rounded-lg shadow-sm md:h-96 md:w-96"
        />
        <div className="flex flex-col gap-1 md:flex-1">
          <div className="my-4 flex items-center justify-between">
            <p className="text-2xl font-semibold">{item.name}</p>
            <img src={icon_optionbar} className="h-6 w-6 cursor-pointer"></img>
          </div>
          <h1 className="text-3xl font-bold">
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </h1>
          <div className="my-4 border-b border-gray-300"></div>
          <p className="detail-description mb-2 text-sm font-bold">상품소개</p>
          <p className="description mb-4 text-base">{item.description}</p>

          <p className="mb-2 text-sm font-bold">상품 태그</p>
          <div className="mb-4 flex flex-wrap gap-4">
            {item.tags.map((tag, index) => (
              <div
                key={index}
                className="rounded-full bg-gray-50 px-4 py-2 text-gray-800"
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
      <div className="mb-8 flex flex-col">
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
          onClick={handleSubmitComment}
          className="self-end rounded bg-main px-6 py-2 text-white disabled:bg-gray-400"
          disabled={!content}
        >
          등록
        </button>
      </div>
      {comments.length === 0 ? (
        <CommentNotFound />
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div key={index}>
              <div className="relative mb-4 flex items-center justify-between">
                <p>{comment.content}</p>
                <img
                  src={icon_optionbar}
                  className="h-6 w-6 cursor-pointer"
                  onClick={handleOptionClick}
                ></img>
                {isOptionBoxVisible && myId === comment.writer.id && (
                  <div className="absolute right-0 top-5 z-50 flex flex-col gap-1 rounded-xl bg-white shadow-md">
                    <div
                      onClick={handleEditComment}
                      className="w-full cursor-pointer rounded-t-xl px-4 py-2 hover:bg-gray-100"
                    >
                      수정
                    </div>
                    <div
                      onClick={handleDeleteComment}
                      className="w-full cursor-pointer rounded-b-xl px-4 py-2 hover:bg-gray-100"
                    >
                      삭제
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4 flex items-center gap-4">
                <img
                  src={comment.writer.image}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex h-10 flex-col justify-between">
                  <p className="nickname text-sm font-semibold">
                    {comment.writer.nickname}
                  </p>
                  <p className="text-xs text-gray-400">
                    {displayTime(comment.createdAt)}
                  </p>
                </div>
              </div>
              <div className="border-b border-gray-300"></div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-12 flex justify-center">
        <Link to="/items">
          <button className="flex items-center justify-center gap-2 rounded-full bg-main px-6 py-3 text-lg text-white">
            목록으로 돌아가기
            <img src={icon_back} className="h-6 w-6" />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ItemsDetail

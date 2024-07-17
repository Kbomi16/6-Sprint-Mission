/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Link, useParams } from 'react-router-dom'
import styles from '../styles/itemsdetail.module.css'
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
    arg0: (comment: any, index: any) => import('react/jsx-runtime').JSX.Element
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
  const { id } = useParams()
  const [item, setItem] = useState<ItemData | null>(null)
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

  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <img
          src={item.images[0]}
          alt={item.name}
          className={styles['item-img']}
        />
        <div className={styles['detail-description']}>
          <div className={styles['detail-nav']}>
            <p className={styles['detail-name']}>{item.name}</p>
            <img src={icon_optionbar} className={styles.navimg}></img>
          </div>
          <h1>
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </h1>
          <div className={styles['border-bottom']}></div>
          <p className={styles['detail-description']}>상품소개</p>
          <p className={styles.description}>{item.description}</p>

          <p className={styles['detail-tags']}>상품 태그</p>
          <div className={styles.tags}>
            {item.tags.map((tag, index) => (
              <div key={index} className={styles.tag}>
                #{tag}
              </div>
            ))}
          </div>
          <div className={styles.favoriteCount}>
            <img src={icon_favorite} />
            {item.favoriteCount}
          </div>
        </div>
      </div>

      <div className={styles.question}>
        <div className={styles['border-bottom']}></div>
        <h5>문의하기</h5>
        <textarea
          className={styles['question-input']}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        ></textarea>
        <button className={styles['button-disabled']}>등록</button>
      </div>

      {comments.length === 0 ? (
        <CommentNotFound />
      ) : (
        <div className={styles.comments}>
          {comments.map((comment, index) => (
            <>
              <div className={styles.usernav}>
                <p>{comment.content}</p>
                <img src={icon_optionbar} className={styles.navimg}></img>
              </div>

              <div key={index} className={styles.user}>
                <img src={comment.writer.image} className={styles.userimg} />
                <div className={styles['user-info']}>
                  <p className={styles.nickname}>{comment.writer.nickname}</p>
                  <p className={styles.time}>
                    {displayTime(comment.createdAt)}
                  </p>
                </div>
              </div>
              <div className={styles['border-bottom']}></div>
            </>
          ))}
        </div>
      )}

      <div className={styles.backtolist}>
        <Link to={'/items'}>
          <button className={styles.back}>
            목록으로 돌아가기
            <img src={icon_back} className={styles.backimg} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ItemsDetail

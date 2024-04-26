/* eslint-disable jsx-a11y/alt-text */
import { Link, useParams } from 'react-router-dom'
import styles from '../styles/itemsdetail.module.css'
import { useEffect, useState } from 'react'
import { getProductsComments, getProductsDetail } from '../api/api'
import { CommentNotFound } from '../components'

import icon_optionbar from '../assets/icon_optionbar.png'
import icon_back from '../assets/icon_back.png'
import icon_favorite from '../assets/icon_favorite.png'

function ItemsDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [comments, setComments] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getProductsDetail(id)
        setItem(data)
      } catch (error) {
        console.error('상품 정보를 가져오는데 실패했습니다', error)
      }
    }
    fetchItem()

    const fetchComments = async () => {
      try {
        const comments = await getProductsComments(id)
        setComments(comments)
        console.log(comments.createdAt)
      } catch (error) {
        console.log('댓글을 가져오는데 실패했습니다', error)
      }
    }
    fetchComments()
  }, [id])

  if (!item) {
    return <div>Loading...</div>
  }

  if (!comments) {
    return <div>Loading...</div>
  }

  const displayTime = (time) => {
    const date = new Date(time)
    const now = Date.now()

    const milliSeconds = now - date

    const seconds = milliSeconds / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24
    const months = days / 30
    const years = months / 12

    if (seconds < 60) {
      return '방금 전'
    } else if (minutes < 60) {
      return `${Math.floor(minutes)}분 전`
    } else if (hours < 24) {
      return `${Math.floor(hours)}시간 전`
    } else if (days < 30) {
      return `${Math.floor(days)}일 전`
    } else if (months < 12) {
      return `${Math.floor(months)}달 전`
    } else {
      return `${Math.floor(years)}년 전`
    }
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
            <img
              src={icon_optionbar}
              className={styles.navimg}
            ></img>
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
                <img
                  src={icon_optionbar}
                  className={styles.navimg}
                ></img>
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
            <img
              src={icon_back}
              className={styles.backimg}
            />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ItemsDetail

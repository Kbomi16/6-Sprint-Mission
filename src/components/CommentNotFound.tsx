/* eslint-disable jsx-a11y/alt-text */
import styles from '../styles/commentnotfound.module.css'
import img_empty from '../assets/img_empty.png'

function CommentNotFound() {
  return (
    <div className={styles.container}>
      <img src={img_empty} className={styles.notfoundimg} />
      <p className={styles.notfound}>아직 문의가 없습니다.</p>
    </div>
  );
}

export default CommentNotFound;
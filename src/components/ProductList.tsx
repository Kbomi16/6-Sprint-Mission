/* eslint-disable jsx-a11y/alt-text */
import styles from '../styles/productList.module.css'
import { Link } from 'react-router-dom'

import icon_favorite from '../assets/icon_favorite.png'

type Products = {
  id: string
  name: string
  images: string[]
  price: number
  favoriteCount: number
}

type ProductsProps = {
  products: Products[]
}

function ProductList({ products }: ProductsProps) {
  return (
    <div className={styles.products}>
      {/* products는 map을 통해 배열 내의 각 상품을 순회하면서 상품 정보 렌더링 */}
      {products.map((product) => (
        <Link
          key={product.id}
          className={styles.product}
          to={`/items/${product.id}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className={styles['product-img']}
          />
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div className={styles.favoritecount}>
            <img src={icon_favorite}></img>
            <div className={styles['favoritecount-number']}>
              {product.favoriteCount}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductList
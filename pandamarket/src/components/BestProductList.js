/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "../styles/bestproductlist.module.css";
import { Link } from "react-router-dom";

function BestProductList({ products }) {
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <Link key={product.id} className={styles.product} to={`/items/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className={styles["product-img"]}
          />
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
          <div className={styles.favoritecount}>
            <img src={require('../assets/icon_favorite.png')}></img>
            <div className={styles["favoritecount-number"]}>
              {product.favoriteCount}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BestProductList;

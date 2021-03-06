import React from "react";
import { Link } from "react-router-dom";
import { pluralize, idbPromise } from "../../utils/helpers"
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/dist/actions";
import { useDispatch, useSelector} from 'react-redux';
function ProductItem(item) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-2 py-2">
      <Link to={`/products/${_id}`}>
        <p>{name}</p>
        <img
          alt={name}
          src={`/images/${image}`}
          className= "card-img"
        />
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;

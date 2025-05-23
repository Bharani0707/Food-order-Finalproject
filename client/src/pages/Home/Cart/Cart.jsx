import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { removeFromCart } from "../../../redux/reduxSlice/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("Cart Items: ", cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your cart.");
      navigate("/");
    }
  }, [token, navigate]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.info("Item removed from cart");
  };

  const handlePromoSubmit = () => {
    toast.success("Promo code applied successfully!");
  };

  const validCartItems = cartItems.filter((item) => item.name && item.price);
  const subTotal = validCartItems.reduce((accumulator, item) => {
    const price = parseFloat(item.price);
    const quantity = parseFloat(item.quantity);
    const total = price * quantity;
    return accumulator + total;
  }, 0);
  const deliveryFee = subTotal > 299 ? 0 : 50;
  const totalAmount = subTotal + (subTotal > 0 ? deliveryFee : 0);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {cartItems.length === 0 ? (
          <h3>No Items in the cart</h3>
        ) : (
          cartItems.map((item, index) => {
            if (item.quantity > 0) {
              const price = parseFloat(item.price);
              const quantity = parseFloat(item.quantity);
              const total = price * quantity;

              return (
                <div key={item._id || index}>
                  <div className="cart-items-title cart-items-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <h4> {item.name}</h4>
                    <p> Rs {price}</p>
                    <p> {quantity}</p>
                    <p>{!isNaN(total) ? total : 0}</p>
                    <h3
                      onClick={() => handleRemoveItem(item._id)}
                      className="remove-item"
                    >
                      x
                    </h3>
                  </div>
                  <hr key={`${item._id}-hr`} />
                </div>
              );
            }
            return null;
          })
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total Amount</h2>
          <div>
            <div className="cart-total-info">
              <p>Subtotal</p>
              <p>Rs. {subTotal.toFixed(2)}</p>
            </div>
            <hr />
            {subTotal > 0 && subTotal < 299 && (
              <>
                <div className="cart-total-info">
                  <p>Delivery Fee</p>
                  <p>Rs. {deliveryFee.toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-info">
              <b>Total</b>
              <b>
                {totalAmount ? `Rs. ${totalAmount.toFixed(2)}` : "Rs. 0.00"}
              </b>
            </div>
          </div>
          <Link to={cartItems.length > 0 ? "/order" : "#"}>
            <button disabled={cartItems.length === 0}>
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>

        <div className="cart-promo-code">
          <div>
            <p>Have promo code? Enter it here...</p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder="PROMOCODE" />
              <button type="button" onClick={handlePromoSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

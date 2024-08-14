import { useContext } from "react";
import { GlobalContext } from "../utils/GlobalStorage";

export default function Product({ product }) {
  const { cartData, addToCart, removeFromCart } = useContext(GlobalContext);

  return (
    <article className="border min-w-[20vw] w-[20vh] h-full flex flex-col items-center p-5 m-[2px] gap-1 rounded bg-gray-100">
      <img src={product.thumbnail} alt="" width="150vw" />
      <p className="font-bold text-center text-sm">{product.title}</p>
      <p className="text-sm">${product.price}</p>
      <p className="text-sm">
        <strong>Rating: </strong>
        {product.rating}
      </p>

      {cartData.find((item) => item.id === product.id) ? (
        <button
          onClick={() => removeFromCart(product.id)}
          className="border px-3 py-1 bg-slate-400 rounded text-[12px] md:text-sm"
        >
          Remove from cart
        </button>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="border px-3 py-1 bg-slate-400 rounded text-[12px] md:text-sm"
        >
          Add to cart
        </button>
      )}
    </article>
  );
}

/**
 * {
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  "category": "beauty",
  "price": 9.99,
  "discountPercentage": 7.17,
  "rating": 4.94,
  "stock": 5,
  "tags": [
    "beauty",
    "mascara"
  ],
  "brand": "Essence",
  "sku": "RCH45Q1A",
  "weight": 2,
  "dimensions": {
    "width": 23.17,
    "height": 14.43,
    "depth": 28.01
  },
  "warrantyInformation": "1 month warranty",
  "shippingInformation": "Ships in 1 month",
  "availabilityStatus": "Low Stock",
  "reviews": [
    {
      "rating": 2,
      "comment": "Very unhappy with my purchase!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewerName": "John Doe",
      "reviewerEmail": "john.doe@x.dummyjson.com"
    },
    {
      "rating": 2,
      "comment": "Not as described!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewerName": "Nolan Gonzalez",
      "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
    },
    {
      "rating": 5,
      "comment": "Very satisfied!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewerName": "Scarlett Wright",
      "reviewerEmail": "scarlett.wright@x.dummyjson.com"
    }
  ],
  "returnPolicy": "30 days return policy",
  "minimumOrderQuantity": 24,
  "meta": {
    "createdAt": "2024-05-23T08:56:21.618Z",
    "updatedAt": "2024-05-23T08:56:21.618Z",
    "barcode": "9164035109868",
    "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
  },
  "images": [
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
  ],
  "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
}
 */

/*
The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.

Price: $9.99

Discount: 7.17%

Rating: 4.94

Stock: 5

Category: beauty

Brand: Essence

SKU: RCH45Q1A

Dimensions: 23.17 x 14.43 x 28.01 cm

Warranty: 1 month warranty

Shipping: Ships in 1 month

Availability: Low Stock

Reviews:
John Doe: Very unhappy with my purchase! (Rating: 2)
Nolan Gonzalez: Not as described! (Rating: 2)
Scarlett Wright: Very satisfied! (Rating: 5)
Return Policy: 30 days return policy

Minimum Order Quantity: 24

Barcode: 9164035109868 */

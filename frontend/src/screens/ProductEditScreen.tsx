import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getStoreData,
  mutateStoreData,
  uploadProductImage,
} from "../utils/api";
import { apiEndpoints } from "../utils/constants";
import { useAppContext } from "../contexts/AppContext";
import { useState, useEffect } from "react";
import { MessageModal } from "../components/modals/MessageModal";
import { product as productType } from "../utils/types";
import { envs } from "../utils/loadEnv";

export const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useAppContext();
  const [product, setProduct] = useState<productType>();
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleUpdateProduct = (e: any) => {
    e.preventDefault();
    showLoading();
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const imageInput = document.getElementById(
      "image"
    ) as HTMLInputElement | null;
    const brandInput = document.getElementById(
      "brand"
    ) as HTMLInputElement | null;
    const categoryInput = document.getElementById(
      "category"
    ) as HTMLInputElement | null;
    const countInStockInput = document.getElementById(
      "countInStock"
    ) as HTMLInputElement | null;
    const descriptionInput = document.getElementById(
      "description"
    ) as HTMLInputElement | null;

    mutateStoreData(
      apiEndpoints.product(id),
      {
        _id: id,
        name: nameInput?.value,
        price: priceInput?.value,
        image: imageInput?.value,
        brand: brandInput?.value,
        category: categoryInput?.value,
        countInStock: countInStockInput?.value,
        description: descriptionInput?.value,
      },
      "PUT"
    )
      .then(() => {
        hideLoading();
        navigate("/dashboard/productlist");
        alert("Product updated successfully.");
      })
      .catch((err) => {
        hideLoading();
        setShowModal(true);
        setMessage("Oops! Something went wrong. Please try again.");
        console.log(err);
      });
  };

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData, file);

    showLoading();
    uploadProductImage(formData)
      .then((data) => {
        const imageInput = document.getElementById("image") as HTMLInputElement;
        hideLoading();
        setShowModal(true);
        setMessage("Image uploaded successfully.");
        imageInput.value = (data as any).image;
      })
      .catch(() => {
        hideLoading();
        setShowModal(true);
        setMessage("Error");
      });
  };

  useEffect(() => {
    showLoading();
    getStoreData(apiEndpoints.product(id))
      .then((prod) => {
        hideLoading();
        setProduct(prod as productType);
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  }, []);

  return (
    <div className="content">
      {product && (
        <>
          <div>
            <Link to="/dashboard/productlist">Back to products</Link>
          </div>
          <div className="form-container">
            <form onSubmit={handleUpdateProduct} id="edit-product-form">
              <ul className="form-items">
                <li>
                  <h1>Edit Product {product?._id.substring(0, 8)}</h1>
                </li>
                <li>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={`${product?.name}`}
                    id="name"
                  />
                </li>
                <li>
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={`${product?.price}`}
                    id="price"
                  />
                </li>
                <li>
                  <label htmlFor="image">Image (680 x 830)</label>
                  <img
                    style={{ width: "150px", margin: "auto" }}
                    src={`${envs.BACKEND_URL}${product?.image}`}
                    alt="product"
                  />
                  <input
                    type="text"
                    disabled
                    name="image"
                    defaultValue={`${product?.image}`}
                    id="image"
                  />
                  <input
                    onChange={uploadImage}
                    type="file"
                    name="image-file"
                    id="image-file"
                  />
                </li>
                <li>
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    defaultValue={`${product?.brand}`}
                    id="brand"
                  />
                </li>
                <li>
                  <label htmlFor="countInStock">Count In Stock</label>
                  <input
                    type="text"
                    name="countInStock"
                    defaultValue={`${product?.countInStock}`}
                    id="countInStock"
                  />
                </li>
                <li>
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={`${product?.category}`}
                    id="category"
                  />
                </li>
                <li>
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    defaultValue={`${product?.description}`}
                    id="description"
                  />
                </li>
                <li>
                  <button type="submit" className="primary">
                    Update
                  </button>
                </li>
              </ul>
            </form>
          </div>
          <MessageModal
            message={message}
            show={showModal}
            setShow={setShowModal}
          />
        </>
      )}
    </div>
  );
};

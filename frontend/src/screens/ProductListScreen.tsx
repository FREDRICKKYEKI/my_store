import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { getStoreData, mutateStoreData } from "../utils/api";
import { apiEndpoints } from "../utils/constants";
import { product } from "../utils/types";
import { Link } from "react-router-dom";

export const ProductListScreen = () => {
  const [products, setProducts] = useState<product[]>();
  const { showLoading, hideLoading } = useAppContext();

  useEffect(() => {
    showLoading();

    getStoreData(apiEndpoints.products)
      .then((prod: unknown) => {
        setProducts(prod as product[]);
        hideLoading();
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  }, []);

  const createProduct = () => {
    mutateStoreData(apiEndpoints.products, {}, "POST")
      .then((response) => {
        window.location.reload();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleDelete(id: string): void {
    if (confirm("Are you sure to delete this product?")) {
      showLoading();
      mutateStoreData(apiEndpoints.product(id), {}, "DELETE")
        .then((response) => {
          console.log(response);
          hideLoading();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          hideLoading();
        });
    }
  }

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-content">
          <h1>Products</h1>
          <button
            onClick={createProduct}
            id="create-product-button"
            className="primary"
          >
            Create Product
          </button>
          <div className="product-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th className="tr-action">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product?._id}>
                    <td>{product?._id}</td>
                    <td>{product?.name}</td>
                    <td>{product?.price}</td>
                    <td>{product?.category}</td>
                    <td>{product?.brand}</td>
                    <td>
                      <Link
                        to={`/product/${product._id}/edit`}
                        id={`${product._id}`}
                        className="btn edit-button"
                      >
                        <button> Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        id={`${product._id}`}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

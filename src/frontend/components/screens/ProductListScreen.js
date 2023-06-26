import { useEffect, useState } from "react";
import { DashboardMenu } from "../DashboardMenu";
import { getProducts } from "../../../api";
import { useAppContext } from "../../../contexts/AppContext";

export const ProductListScreen = () => {
  const [products, setProducts] = useState();
  const { showLoading, hideLoading } = useAppContext();

  useEffect(() => {
    showLoading();
    const fetchProducts = async () => {
      return await getProducts();
    };

    fetchProducts()
      .then((prod) => {
        setProducts(prod);
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  }, []);
  products && hideLoading();
  console.log(products);

  return (
    <>
      {products && (
        <div class="dashboard">
          <DashboardMenu selected="products" />
          <div class="dashboard-content">
            <h1>Products</h1>
            <button id="create-product-button" class="primary">
              Create Product
            </button>
            <div class="product-list">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th class="tr-action">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <button id={`${product._id}`} class="edit-button">
                          Edit
                        </button>
                        <button id={`${product._id}`} class="delete-button">
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
      )}
    </>
  );
};

import { ProductList } from "./UserPage/Products/ProductsList";

import AuthLayout from "../layout/AuthLayout";
import { ProductToolbar } from "./UserPage/Products/ProductToolbar";

export const ProductPage = () => {
  return (
    <>
      <AuthLayout>
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-12">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow">Seasonal Collection</span>

                <h2 className="text-4xl font-fraunces mt-3">Menu Management</h2>

                <p className="mt-4 text-[#A9B4A4] max-w-lg">
                  Curate and manage the European culinary collection served at
                  Le Cellier.
                </p>
              </div>

              <button>+ Add New Dish</button>
            </div>

            <ProductToolbar />

            <ProductList />
          </div>
        </section>
      </AuthLayout>
    </>
  );
};

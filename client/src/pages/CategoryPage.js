import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../Hooks/useCategory";
import Layout from "../components/layout/layout";
import "../styles/AllCatrgoryPage.css"; // Import your custom styles

const CategoryPage = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="category-container">
        {categories.map((c) => (
          <div className="category-card" key={c._id}>
            <Link to={`/category/${c.slug}`} className="category-link">
              {c.name}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CategoryPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart} from './../../redux/Products/products.actions';
import Button from './../forms/Button';
import Product from './Product';
import FormSelect from './../forms/FormSelect';
import LoadMore from './../LoadMore';
import './styles.scss';


const mapState = ({ productsData }) => ({
  products: productsData.products
});

const ProductResults = ({  }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(
      fetchProductsStart({filterType })
    )
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <p>
          .אין תוצאה לחיפוש
        </p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [{
      name: 'הצג הכל',
      value: ''
    }, {
      name: 'חלקי חילוף',
      value: 'parts'
    }, {
      name: 'מתקני מים',
      value: 'dispensers'
    }, {
      name: 'פילטרים',
      value: 'filters'
    }],
    handleChange: handleFilter
  };

  const searchHandler = (e) => {
    e.preventDefault()
    var el = document.getElementById("myInputID");
    el.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
}

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    )
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="products">

      <label style={{ fontSize: 40}}>
        חפש מוצרים
      </label>
      <form onSubmit={searchHandler}>
            <input type="text" placeholder="שם מוצר.." name="search"
              onChange={(e) => setKeyword(e.target.value)}></input>
          </form>
      <FormSelect {...configFilters} />

      <div className="productResults">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;
          if (!productThumbnail || !productName || !productName.includes(keyword) ||
            typeof productPrice === 'undefined') return null;

          const configProduct = {
            ...product
          };

          return (
            <Product key={pos} {...configProduct} />
          );
        })}
      </div>

      {!isLastPage && (
        <LoadMore {...configLoadMore} />
      )}

    </div>
  );
};

export default ProductResults;

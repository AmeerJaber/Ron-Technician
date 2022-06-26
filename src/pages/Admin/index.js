import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../redux/Products/products.actions';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/LoadMore';
import CKEditor from 'ckeditor4-react';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const Admin = props => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('parts');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');
  let history = useHistory();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory('parts');
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setProductDesc('');
  };

    function handleClick() {
    history.push("/WorkersForm");
    window.location.reload(false);
  }

  function handleClick2() {
    history.push("/BookingList");
    window.location.reload(false);
  }

  function handleClick3() {
    history.push("/ContactList");
    window.location.reload(false);
  }

  function handleClick4() {
    history.push("/OrderList");
    window.location.reload(false);
  }
  function handleClick5() {
    history.push("/ModifyWorker");
    window.location.reload(false);
  }


  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
      })
    );
    resetForm();

  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">
<div className="btn-group">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
            הוספת מוצר חדש
            </Button>

            <Button onClick={() => handleClick()}>
            טופס עובדים
            </Button>

            <Button onClick={() => handleClick2()}>
            רשימת תורים
            </Button>
            
            <Button onClick={() => handleClick3()}>
           מיילים
            </Button>

            <Button onClick={() => handleClick4()}>
           הזמנות
            </Button>

            <Button onClick={() => handleClick5()}>
           עדכן עובד
            </Button>

          </li>
        </ul>
      </div>
      </div>
      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <label style={{ fontSize: 28}}>
              הוספת מוצר חדש
            </label>
          
            <FormSelect
              label="סוג מוצר"
              options={[{
                value: "parts",
                name: "חלקים"
              }, {
                value: "dispensers",
                name: "מתקני מים"
              },
              {
                value: "filters",
                name: "פלטרים"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="שם מוצר"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="קישור תמונה"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="מחיר"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />

            <CKEditor
              onChange={evt => setProductDesc(evt.editor.getData())}
            />

            <br />

            <Button type="submit">
              הוסף מוצר
            </Button>

          </form>
        </div>
      </Modal>

      <div className="manageProducts">

        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>
                 ניהול מוצרים
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} />
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                          ₪{productPrice}
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                              מחיקה
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>

              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Admin;
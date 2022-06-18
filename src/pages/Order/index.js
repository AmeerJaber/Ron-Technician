import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailsStart } from './../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from './../../components/OrderDetails';

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails
});

const Order = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  useEffect(() => {

    dispatch(
      getOrderDetailsStart(orderID)
    );

  }, []);

  return (
    <div className='main-content'>

      <h1>
        מספר הזמנה: #{orderID}
      </h1>

      <OrderDetails order={orderDetails} />

      <h3>
      סה"כ: ₪{orderTotal}
      </h3>

    </div>
  )

}

export default Order;
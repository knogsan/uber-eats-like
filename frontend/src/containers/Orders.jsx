import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

// components
import { OrderDetailItem } from '../components/OrderDetailItem';
import { OrderButton } from '../components/Buttons/OrderButton';
import CircularProgress from '@mui/material/CircularProgress';

// apis
import { fetchOrderFoods } from '../apis/order_foods';
import { postOrder } from '../apis/orders';

// reducers
import {
  initialState,
  orderFoodsActionTyps,
  orderFoodsReducer,
} from '../reducers/orderFoods';

// images
import MainLogo from '../images/logo.png';

// constants
import { REQUEST_STATE } from '../constants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

// Orders
export const Orders = () => {
  const [state, dispatch] = useReducer(orderFoodsReducer, initialState);

  useEffect(() => {
    dispatch({ type: orderFoodsActionTyps.FETCHING });
    fetchOrderFoods()
      .then((data) =>
        dispatch({
          type: orderFoodsActionTyps.FETCH_SUCCESS,
          payload: {
            orderFoodsSummary: data
          }
        })
      )
      .catch((e) => console.error(e));
  }, []);

  const postOrderFoods = () => {
    dispatch({ type: orderFoodsActionTyps.POSTING });
    postOrder({
      order_food_ids: state.orderFoodsSummary.order_food_ids,
    }).then(() => {
      dispatch({ type: orderFoodsActionTyps.POST_SUCCESS });
      window.location.reload();
    });
  };

  const orderButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました！';
      default:
        return '注文を確定する';
    }
  };

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
          <div>
            <OrderItemWrapper>
              {
                // APIローディング中はくるくる回るローディングコンポーネントを表示
                state.fetchState === REQUEST_STATE.LOADING ?
                  <CircularProgress />
                :
                  state.orderFoodsSummary &&
                    <OrderDetailItem
                      orderFoods={state.orderFoodsSummary.order_foods}
                      totalFee={state.orderFoodsSummary.total_fee}
                      totalPrice={state.orderFoodsSummary.total_amount}
                    />
              }
            </OrderItemWrapper>
          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.orderFoodsSummary &&
                <OrderButton
                  onClick={() => postOrderFoods()}
                  disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
                >
                  {orderButtonLabel()}
                </OrderButton>
            }
            {
              state.fetchState === REQUEST_STATE.OK && !(state.orderFoodsSummary) &&
                <p>
                  注文予定の商品はありません。
                </p>
            }
          </div>
        </div>
      </OrderListWrapper>

    </Fragment>
  )
}

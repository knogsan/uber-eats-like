import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

// components
import { LocalMallIcon, QueryBuilderIcon } from './Icons';

// constants
import { FONT_SIZE } from '../style_constants';

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountText = styled.p`
  font-size: ${FONT_SIZE.STAND_BODY};
  font-weight: bold;
`;

export const OrderDetailItem = ({
  orderFoods,
  totalFee,
  totalPrice,
}) => {
  return (
    <Fragment>
      {orderFoods.map((orderFood, _) => (
        <Fragment key={orderFood.restaurant.id}>
          <LineWrapper>
            <LocalMallIcon />
            <Link to={`/restaurants/${orderFood.restaurant.id}/foods`}>
              {orderFood.restaurant.name}
            </Link>
          </LineWrapper>
          <LineWrapper>
            <QueryBuilderIcon />
            {orderFood.restaurant.time_required}分で到着予定
          </LineWrapper>
          {orderFood.foods.map((food, _) => (
            <LineWrapper key={food.name}>
              <p>{food.name}</p>
              <p>数量: {food.count}</p>
              <p>¥ {food.price}</p>
            </LineWrapper>
          ))}
          <LineWrapper>
            <p>配送料</p>
            <p>¥ {orderFood.restaurant.fee}</p>
          </LineWrapper>
          <LineWrapper>
            <p>小計</p>
            <p>¥ {orderFood.subtotal + orderFood.restaurant.fee}</p>
          </LineWrapper>
        </Fragment>
      ))}
      <LineWrapper>
        <AmountText>
          合計
        </AmountText>
        <AmountText>
          ¥ {totalPrice + totalFee}
        </AmountText>
      </LineWrapper>
    </Fragment>
  )
};

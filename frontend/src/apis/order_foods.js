import axios from 'axios';
import { orderFoods } from '../urls/index'

export const postOrderFoods =(params) => {
  return axios.post(orderFoods,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};

export const fetchOrderFoods = () => {
  return axios.get(orderFoods)
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};

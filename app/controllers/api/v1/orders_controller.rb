module Api
  module V1
    class OrdersController < ApplicationController
      def create
        posted_order_foods = OrderFood.where(id: params[:order_food_ids])
        order = Order.new(
          total_price: total_price(posted_order_foods),
        )
        if order.save_with_update_order_foods!(posted_order_foods)
          render json: {}, status: :no_content
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def total_price(posted_order_foods)
        posted_order_foods.sum {|order_food| order_food.total_amount } + posted_order_foods.first.food.restaurant.fee
      end
    end
  end
end

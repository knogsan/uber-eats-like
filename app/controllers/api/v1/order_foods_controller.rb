module Api
  module V1
    class OrderFoodsController < ApplicationController
      before_action :set_food, only: %i(create replace)

      def index
        order_foods = OrderFood.active.preload(food: :restaurant)
        if order_foods.exists?
          response = order_foods.map do |of|
            [
              of.restaurant.id,
              {
                restaurant:
                  {
                    id: of.restaurant.id,
                    name: of.restaurant.name,
                    fee: of.restaurant.fee,
                    time_required: of.restaurant.time_required
                  },
                foods: [],
                subtotal: 0
              }
            ]
          end.uniq.to_h

          order_foods.each do |of|
            response[of.restaurant.id][:foods] << { name: of.name, count: of.count, price: of.total_amount }
            response[of.restaurant.id][:subtotal] += of.total_amount
          end

          render json: {
            order_foods: response.map { |_k, v| v },
            total_fee: response.values.sum { |res| res[:restaurant][:fee] },
            total_amount: order_foods.sum { |order_food| order_food.total_amount },
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        set_order_food(@food)

        if @order_food.save
          render json: {
            order_food: @order_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_food
        puts params["food_id"]
        puts params[:food_id]
        # @food = Food.find(params[:food_id])
        @food = Food.find(params["food_id"])
      end

      def set_order_food(food)
        if food.order_food.present?
          @order_food = food.order_food
          @order_food.attributes = {
            # count: food.order_food.count + params[:count],
            count: food.order_food.count + params["count"],
            active: true
          }
        else
          @order_food = food.build_order_food(
            # count: params[:count],
            count: params["count"],
            active: true
          )
        end
      end
    end
  end
end

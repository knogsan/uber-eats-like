class Order < ApplicationRecord
  has_many :order_foods

  validates :total_price, numericality: { greater_than: 0 }

  def save_with_update_order_foods!(order_foods)
    ActiveRecord::Base.transaction do
      order_foods.each do |order_food|
        order_food.update!(active: false, order: self)
      end
      self.save!
    end
  end
end

class Food < ApplicationRecord
  belongs_to :restaurant
  belongs_to :order, optional: true
  has_one :order_food

  delegate :id, :name, to: :restaurant, prefix: true
end

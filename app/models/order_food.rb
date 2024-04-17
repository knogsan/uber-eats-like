class OrderFood < ApplicationRecord
  belongs_to :food
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }

  delegate :name, :restaurant, to: :food

  def total_amount
    food.price * count
  end
end

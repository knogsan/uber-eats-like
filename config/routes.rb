Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :restaurants do
        resources :foods, only: %i[index]
      end
      resources :order_foods, only: %i[index create]
      resources :orders, only: %i[create]
    end
  end
end

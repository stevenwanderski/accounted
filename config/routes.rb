Rails.application.routes.draw do
  devise_for :users
  root "pages#app"
  get "login", to: "pages#login"

  namespace :api, defaults: { format: :json } do
    resources :payments
    # resources :clients
  end
end

Rails.application.routes.draw do
  devise_for :users
  root "pages#app"
  get "login", to: "pages#login"
end

Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'

  resources :users do
    resources :posts, only: [:index, :show, :update, :destroy]
  end

  resources :cities, only: [:index, :show] do
    resources :posts, only: [:index, :create]
  end

end

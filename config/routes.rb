Rails.application.routes.draw do
	get 'home/index'
	get 'home/timestamp'

	root 'home#index'
	namespace :api do
		resources :users, only: [:index, :create, :show, :update, :destroy]
		resources :sessions, only: [:create]
	end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

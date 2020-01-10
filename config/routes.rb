Rails.application.routes.draw do
  scope '/api/v1' do
      resources :todos
      resources :session
      resources :users
  end
  #get 'todos/index'
  #get 'todos/create'
  #get 'todos/update'
  #get 'todos/destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
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

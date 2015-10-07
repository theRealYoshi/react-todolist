Rails.application.routes.draw do
  namespace :api do
    resources :todos
  end

  root to: 'static_pages#root'
end

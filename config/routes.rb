
Rails.application.routes.draw do
  # get 'employeeactivities/index'
  # get 'employeeactivities/show'
  # get 'employeeactivities/create'
  # get 'employeeactivities/update'
  # get 'employeeactivities/destroy'
  # resources :sessions, only: [:create]
  # get 'activities/index'
  # get 'activities/show'
  # get 'activities/update'
  # get 'activities/create'
  # get 'activities/destroy'
  resources :activities
  resources :employeeactivities
  post :registrations, to: "registrations#create"

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  post :sessions, to: "sessions#create"
  root to: "static#home"
end
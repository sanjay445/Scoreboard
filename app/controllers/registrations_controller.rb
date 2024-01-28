class RegistrationsController < ApplicationController
    def create 
      user = User.create!(
        email: params["user"]["email"],
        password: params["user"]["password"],
        password_confirmation: params["user"]["password_confirmation"],
        role_id: params["user"]["role_id"]
      )
  
      if user 
        session[:user_id] = user.id 
        render json: {
          status: :created,
          user: user
        }
      else
        render json:{ message: "error" }
      end
    end
end
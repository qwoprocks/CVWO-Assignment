class UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    if @user.save
      session[:userid] = @user.id
      render json: {
        logged_in: true,
        user: @user
      }
    else 
      render json: {
        error: @user.errors.full_messages
      }
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end

class UsersController < ApplicationController
  private
  def user_params
    params.require(:user).permit(:userid, :username, :email, :password)
end

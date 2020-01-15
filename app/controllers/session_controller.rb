class SessionController < ApplicationController
    def index
        is_logged_in?
    end

    def create
        @user = User.find_by(email: params[:email])

        if @user && @user.authenticate(params[:password])
            session[:userid] = @user.id
            render json: {
                logged_in: true,
                user: @user
            }
        else
            render json: {
                logged_in: false,
                error: 'Username and/or password may be incorrect, please check your credentials'
            }
        end
    end

    def is_logged_in?
        begin
            @current_user ||= User.find(session[:userid]) if session[:userid]
        rescue ActiveRecord::ActiveRecordError => e
            destroy
            return
        end
        if @current_user
            render json: {
                logged_in: true,
                user: session[:userid]
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    def destroy
        session.clear
        render json: {
            logged_in: false
        }
    end

    private
    def session_params
        params.require(:user).permit(:username, :email, :password)
    end
end
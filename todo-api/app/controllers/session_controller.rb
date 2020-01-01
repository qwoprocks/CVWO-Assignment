class SessionController < ApplicationController
    def index
        is_logged_in?
    end

    def login
        session[:userid] = @user.userid
    end

    def create
        @user = User.find_by(email: session_params[:email])

        if @user && @user.authenticate(session_params[:password])
            login
            render json: {
                logged_in: true,
                user: @user
            }
        else
            render json: {
                error: ['no such user, please check credentials']
            }
        end
    end

    def logged_in?
        @current_user ||= User.find(session[:userid]) if session[:userid]
    end

    def is_logged_in?
        if logged_in? && current_user
            render json: {
                logged_in: true,
                user: current_user
            }
        else
            render json: {
                logged_in: false,
                message: 'not signed in'
            }
        end
    end

    def logout
        session.clear
    end

    def destroy
        logout
        render json: {
            logged_in: false
        }
    end

    private
    def session_params
        params.require(:user).permit(:userid, :username, :email, :password)
    end
end
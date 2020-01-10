class TodosController < ApplicationController
  def index
      todos = Todo.order("created_at DESC").where(creatorid: session[:userid])
      render json: todos
  end

  def create
      todo = Todo.create(todo_param.merge(:creatorid => session[:userid]))
      render json: todo
  end

  def update
      todo = Todo.find(params[:id])
      todo.update_attributes(todo_param)
      render json: todo
  end

  def destroy
      todo = Todo.find(params[:id])
      todo.destroy
      head :no_content, status: :ok
  end

  private
    def todo_param
      params.require(:todo).permit(:id, :created_at, :updated_at, :title, {:tags => []}, :done, :deadline, :creatorid)
    end
end

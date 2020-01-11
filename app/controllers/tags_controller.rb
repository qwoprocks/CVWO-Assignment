class TagsController < ApplicationController
  def index
      tags = Todo.where(creatorid: session[:userid]).pluck(:tags).flatten!
      render json: tags
  end
end

class RemoveTagsFromTodos < ActiveRecord::Migration[6.0]
  def change
    remove_column :todos, :tags
  end
end

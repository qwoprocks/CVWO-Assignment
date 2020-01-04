class AddTagsIndexToTodos < ActiveRecord::Migration[6.0]
  def change
    add_index :todos, :tags, using: 'gin'
  end
end

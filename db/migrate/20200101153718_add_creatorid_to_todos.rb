class AddCreatoridToTodos < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :creatorid, :numeric
  end
end

class ChangeDoneDefaultForTodos < ActiveRecord::Migration[6.0]
  def change
    change_column_default :todos, :done, false
  end
end

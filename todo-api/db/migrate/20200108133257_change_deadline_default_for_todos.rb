class ChangeDeadlineDefaultForTodos < ActiveRecord::Migration[6.0]
  def change
    change_column_default :todos, :deadline, ''
  end
end

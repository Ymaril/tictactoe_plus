class AddBoardToGame < ActiveRecord::Migration[6.0]
  def change
    add_column :games,
               :board,
               :integer,
               array: true
    add_column :games,
               :x_move,
               :boolean,
               default: [0] * 100
  end
end

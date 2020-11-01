class AddBoardToGame < ActiveRecord::Migration[6.0]
  def change
    add_column :games,
               :board,
               :integer,
               array: true,
               default: [0] * 100
    add_column :games,
               :x_move,
               :boolean,
               default: true
  end
end

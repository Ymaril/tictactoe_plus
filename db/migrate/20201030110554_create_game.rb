class CreateGame < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :x_player_id, null: false, index: true, foreign_key: true
      t.integer :o_player_id, index: true, foreign_key: true
      t.string :state, default: 'created', null: false

      t.timestamps
    end
  end
end

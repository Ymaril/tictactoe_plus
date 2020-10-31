class Game < ApplicationRecord
  belongs_to :x_player, class_name: 'User'
  belongs_to :o_player, class_name: 'User', required: false

  validate do |game|
    if game.x_player == game.o_player
      errors.add(:o_player, :cant_be_the_same_as_x_player)
    end
  end

  state_machine :state, initial: :created do
    state all - [:created] do
      validates :o_player, presence: true
    end

    event :start do
      transition created: :started
    end

    event :finish do
      transition started: :finished
    end
  end
end
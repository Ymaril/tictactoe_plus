class Game < ApplicationRecord
  belongs_to :x_player, class_name: 'User'
  belongs_to :o_player, class_name: 'User', required: false

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
class GameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find_by(id: params[:game])
    stream_for @game
  end

  def receive(data)
    board = @game.reload.board
    if current_user.id == current_player.id && board[data['move']] == 0
      board[data['move']] = @game.x_move ? '1' : '2'
      @game.board = board
      @game.x_move = !@game.x_move

      if @game.save
        GameChannel.broadcast_to(@game, {game: @game})
      end
    end
  end

  private

  def current_player
    if @game.x_move
      @game.x_player
    else
      @game.o_player
    end
  end
end
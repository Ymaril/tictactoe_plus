module Api
  class GamesController < ApiController
    before_action :authenticate_user!

    def index
      @games = Game.all

      render json: @games
    end

    def show
      @game = Game.find(params[:id])

      render json: @game, include: [:x_player, :o_player]
    end
  end
end
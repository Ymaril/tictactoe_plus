module Api
  class GamesController < ApiController
    before_action :authenticate_user!

    def index
      @games = Game.all

      render json: @games, include: %i[x_player o_player]
    end

    def show
      @game = Game.find(params[:id])

      render json: @game, include: %i[x_player o_player]
    end
  end
end
module Api
  class GamesController < ApiController
    before_action :authenticate_user!

    def index
      @games = Game.all

      render json: @games, include: %i[x_player o_player]
    end

    def create
      @game = Game.create(x_player: current_user)

      render json: @game
    end

    def show
      @game = Game.find(params[:id])

      render json: @game, include: %i[x_player o_player]
    end
  end
end
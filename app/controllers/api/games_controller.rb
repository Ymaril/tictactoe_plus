module Api
  class GamesController < ApiController
    before_action :authenticate_user!

    def index
      @games = Game.all

      render json: @games
    end

    def create
      @game = Game.create(x_player: current_user)

      render json: @game
    end

    def show
      @game = Game.find(params[:id])

      render json: @game
    end
  end
end
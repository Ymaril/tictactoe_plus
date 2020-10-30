module Api
  class GamesController < ApiController
    before_action :authenticate_user!

    def index
      @games = Game.all

      render json: @games
    end
  end
end
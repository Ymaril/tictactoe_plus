module Api
  class SessionsController < Devise::SessionsController
    respond_to :json
    protect_from_forgery unless: -> { request.format.json? }

    private

    def respond_with(resource, _opts = {})
      render json: resource
    end

    def respond_to_on_destroy
      head :ok
    end
  end
end
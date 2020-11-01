module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.id
    end

    protected

    def find_verified_user # this checks whether a user is authenticated with devise
      verified_user = Warden::JWTAuth::UserDecoder.new.call(
          request.params['token'].remove('Bearer '), :user, nil
      )

      verified_user || reject_unauthorized_connection
    end
  end
end

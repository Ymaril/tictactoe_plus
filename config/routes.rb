Rails.application.routes.draw do
  scope 'api' do
    devise_for :users,
               path: '',
               path_names: {
                   sign_in: 'login',
                   sign_out: 'logout',
                   registration: 'signup'
               },
               controllers: {
                   sessions: 'api/sessions',
                   registrations: 'api/registrations'
               }
    resources :games, controller: 'api/games' do
      member do
        put 'join'
      end
    end
  end

  root 'application#index'
  get '*path' => 'application#index'
  mount ActionCable.server => '/cable'
end

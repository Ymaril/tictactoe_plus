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
  end

  root 'application#index'
  get '*path' => 'application#index'
end

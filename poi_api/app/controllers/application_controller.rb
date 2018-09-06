class ApplicationController < ActionController::API
  include Knock::Authenticable

  # def current_user
  #   return unless session[:id]
  #     @current_user ||= User.find(session[:id])
  # end

end

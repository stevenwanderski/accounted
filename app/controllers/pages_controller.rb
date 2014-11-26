class PagesController < ApplicationController
  def login
  end

  def app
    redirect_to login_path unless user_signed_in?
  end
end
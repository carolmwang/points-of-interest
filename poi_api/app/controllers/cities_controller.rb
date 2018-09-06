class CitiesController < ApplicationController
    
  def index
    render json: {cities: City.all}
  end

  def show
    render json: {city: City.find(params[:id])}
  end

end

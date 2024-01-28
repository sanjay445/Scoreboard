class ActivitiesController < ApplicationController
  before_action :set_activities, only: %i[ show update destroy ]
  
  # GET /activities
  def index
    @activities = Activity.all

    render json: @activities
  end

  # GET /activities/1
  def show
    render json: @activities
  end

  # POST /activities
  def create
    @activities = Activity.new(activities_params)

    if @activities.save
      render json: @activities, status:200
    else
      render json: @activities.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /activities/1
  def update
    if @activities.update(activities_params)
      render json: @activities
    else
      render json: @activities.errors, status: :unprocessable_entity
    end
  end

  # DELETE /activities/1
  def destroy
    @activities = Activity.find(params[:id])
    if @activities
      @activities.destroy
    end  
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_activities
      @activities = Activity.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def activities_params
      params.require(:activities).permit(:name, :description, :points)
    end
end

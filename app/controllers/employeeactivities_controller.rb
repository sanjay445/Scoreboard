class EmployeeactivitiesController < ApplicationController
  def index
    if params[:associate_id].present?
      @empActivities = Employeeactivity.find_by_sql([
        "SELECT * FROM employeeactivities AS eal 
        LEFT JOIN activities as al on al.id = eal.activity_id 
         WHERE eal.associate_id = :associate_id",
        { associate_id: params[:associate_id] }
      ])
      render json: @empActivities 
    else
      @empActivities = Employeeactivity.find_by_sql("select ed.associate_id,ed.name,sum(al.points) as points from employeeactivities as eal
      LEFT JOIN employees as ed ON eal.associate_id = ed.associate_id 
      LEFT JOIN activities as al on al.id = eal.activity_id 
      GROUP BY eal.associate_id ORDER BY points DESC")
      render json: @empActivities
    end  
  end
  def show
    @empActivities = Employeeactivity.find_by(id: params[:id])
    if @empActivities 
      render json: @empActivities, status: 200
    else
      render json: {
        error: "Employee Activities not found"
      }  
    end 
  end

  def create
    @empActivities = Employeeactivity.new(activitylist_params)
    if @empActivities.save 
      render json: @empActivities, status: 200
    else
      render json: {
        error: "Error...creating"
      }  
    end 
  end

  def update
    @empActivities = Employeeactivity.find_by(id: params[:id])
    if @empActivities
      @empActivities.update(
        associate_id: params[:associate_id],
        activity_id: params[:activity_id],
        is_active: params[:is_active]
      )
      render json: @empActivities, status: 200
    else
      render json: {
        error: "Error...Updating"
      } 
    end
  end

  def destroy
    @empActivities = Employeeactivity.find_by(id: params[:id])
    if @empActivities
      @empActivities.destroy
      render json: "Deleted Successfully"
    else
      render json:  "Data not found !"
    end
  end
  def activitylist_params
    params.require(:activitylist).permit(:associate_id, :activity_id, :is_active)
  end
end

class CreateEmployeeactivities < ActiveRecord::Migration[7.0]
  def change
    create_table :employeeactivities do |t|
      t.integer :associate_id
      t.integer :activity_id

      t.timestamps
    end
  end
end

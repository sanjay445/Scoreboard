class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.integer :associate_id
      t.integer :role_id

      t.timestamps
    end
  end
end

require "test_helper"

class EmployeeactivitiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get employeeactivities_index_url
    assert_response :success
  end

  test "should get show" do
    get employeeactivities_show_url
    assert_response :success
  end

  test "should get create" do
    get employeeactivities_create_url
    assert_response :success
  end

  test "should get update" do
    get employeeactivities_update_url
    assert_response :success
  end

  test "should get destroy" do
    get employeeactivities_destroy_url
    assert_response :success
  end
end

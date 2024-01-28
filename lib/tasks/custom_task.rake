
namespace :csv do
    desc 'Generate CSV file for products'
    task generate_products: :environment do
      require 'csv'
      require 'logger'
      # Initialize the logger
      logger = Logger.new('logfile.log')
      activities = Activity.where({id:3})
      csv_file_path = 'Activitylist.csv'
      csv_data = CSV.generate(headers: true) do |csv| 
        # Used lambda
        lambda_example = -> { csv << ['Activity ID', 'Name', 'Description']}
        lambda_example.call
        activities.each do |activity| 
            # Used Proc
            proc_example = Proc.new {csv << [activity.id, activity.name, activity.description] }
            proc_example.call     
        end
      end
      # Save CSV data to the file 
      # Using Block and method example
      def writeData
        yield 
      end
      writeData {
        # Used Exception 
        begin
            File.write(csv_file_path, csv_data)
            puts "CSV file generated: #{csv_file_path}"
            # Used Logger
            logger.info "CSV file generated logger: #{csv_file_path}"
        rescue StandardError => e
            logger.error "Error: #{e.message}"
        end
     }
    end
  end
  
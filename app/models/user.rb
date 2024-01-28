class User < ApplicationRecord
    has_secure_password
    validates_presence_of :email, :password, :role_id
    validates_uniqueness_of :email
    attribute :role_id
end

class Post < ApplicationRecord
  belongs_to :user
  validates :content, :city_id, :user_id, presence: true
end

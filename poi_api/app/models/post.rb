class Post < ApplicationRecord
  belongs_to :user
  validates :content, :poi_id, :city_id, :user_id, presence: true
end

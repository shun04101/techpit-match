class Reaction < ApplicationRecord

  belongs_to :to_user, class_name: "User"
  belongs_to :from_user, class_name: "User"


  enum status: { like: 0, dislike: 1 }



end

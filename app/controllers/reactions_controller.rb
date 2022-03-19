class ReactionsController < ApplicationController


  def create
    reaction = Reaction.find_or_initialize_by(to_user_id: params[:user_id], from_user_id:current_user.id)
    reaction.update_attributes(status: params[:reaction])

  end



end

class RegistrationsController < Devise::RegistrationsController

  protected

  def update_resource(resource, params)
    resource.update_without_current_password(params)
  end


  def after_update_path_for(resource)
    user_path(resource)
  end

  def after_sign_up_path_for(resource)
    users_path
  end


end

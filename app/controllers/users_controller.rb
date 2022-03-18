class UsersController < ApplicationController
  before_action :authenticate_user!


  def show
    @user = User.find(params[:id])
  end


  def index
    # whereは条件にマッチするレコードを全て返します。現在ログインしているユーザー(自分)以外のユーザーのレコードを取得
    @users = User.where.not(id: current_user.id)
    # 現在ログインしているユーザー(自分)のレコードの情報
    @user = User.find(current_user.id)

  end




end

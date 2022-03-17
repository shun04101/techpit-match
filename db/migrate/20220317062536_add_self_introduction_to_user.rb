class AddSelfIntroductionToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :self_introduction, :text
  end
end

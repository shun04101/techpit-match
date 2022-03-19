class CreateReactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.references :to_user, null: false, foreign_key: { to_table: :users }
      t.references :from_user, null: false, foreign_key: { to_table: :users }
      t.integer :status, null: false

      t.timestamps
    end
  end
end

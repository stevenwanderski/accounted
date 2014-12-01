class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.integer :amount_cents, null: false
      t.string :payment_type, null: false
      t.integer :user_id, null: false
      t.integer :client_id
      t.datetime :date, null: false

      t.timestamps
    end
  end
end

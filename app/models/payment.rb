class Payment < ActiveRecord::Base
  validates_presence_of :amount_cents, :payment_type
  validates_inclusion_of :payment_type, in: ["revenue", "expense"]
  belongs_to :client
end

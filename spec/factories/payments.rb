FactoryGirl.define do
  factory :payment do
    amount_cents 1
    payment_type "revenue"
    user_id 1
    client_id 1
    date { Time.now }
  end
end

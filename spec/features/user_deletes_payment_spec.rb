require 'rails_helper'

describe "user deletes a payment", js: true do
  it "removes the payment" do
    user = create(:user)
    payment = create(:payment, user_id: user.id)
    login_as(user)
    visit root_path

    click_link "Delete"

    expect(page).to_not have_content("Delete")
    expect(Payment.all.count).to eq(0)
  end
end
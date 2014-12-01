require 'rails_helper'

describe "user creates a payment", js: true do
  it "redirects to the list page and shows the payment" do
    user = create(:user)
    login_as(user)
    visit root_path
    click_link "Add payment"

    fill_in "amount_cents", with: "100"
    find("input[name='date']").set("11/15/2014")
    find("body").click
    choose "type-expense"
    click_button "Save"

    expect(page).to have_content("expense")
  end
end
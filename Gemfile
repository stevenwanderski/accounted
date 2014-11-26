source 'https://rubygems.org'

gem 'rails', '4.1.5'
gem 'pg'
gem 'mysql2'
gem 'devise'
gem 'simple_form', '>= 3.1.0.rc1'
gem 'sass-rails', '~> 4.0.3'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'bower-rails'
gem 'foreman'

group :development do
  gem 'quiet_assets'
  gem 'better_errors'
end

group :test do
  gem 'capybara'
end

group :development, :test do
  gem 'rspec-rails', '~> 3.0.0'
  gem 'factory_girl_rails', '~> 4.0'
  gem 'faker'
end

group :production, :staging do
  gem 'rails_12factor'
  gem 'rails_stdout_logging'
  gem 'rails_serve_static_assets'
end
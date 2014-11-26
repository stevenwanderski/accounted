require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Accounted
  class Application < Rails::Application
    config.generators do |generate|
      generate.helper false
      generate.assets false
      generate.view_specs false
    end

    config.autoload_paths += %W(#{config.root}/lib)
    config.time_zone = 'Central Time (US & Canada)'

    config.assets.paths << Rails.root.join("vendor","assets","bower_components")
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","bootstrap-sass-official","assets","fonts")

    config.assets.precompile << %r(.*.(?:eot|svg|ttf|woff)$)
  end
end

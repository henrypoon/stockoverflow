## Install
It's recommended to use Ruby 2.3.x and NodeJS 6.11.x.
```sh
# install bundler if not available
gem install bundler

# install gem dependencies
bundle install

# install npm dependencies
npm install

# create the postgres databases
# update config/database.yml details if needed
rake db:create

# generate assets for development
npm run webpack

# start server
rails s
```

## Webpack scripts

`npm run webpack`  
Builds the assets for development mode.

`npm run webpack-watch`  
Builds the assets for development mode, and rebuilds on every detected change.

`npm run webpack-production`  
Builds the assets for production mode, output files are hashed.
# ShareAustin

ShareAustin provides a place where a community can find and provide hard to rent items -- like a kayak, a parking spot, or a guitar amp -- quickly and easily. Filtered searches and detailed listings for each rental provide photos, a description, when the item is available, and the renter's history. Integration with the Stripe API makes payments quick, safe, and secure. Have a question about a rental? Chat with the renter from within the app. Finally, everyone is held accountable through a mutual rating / review system that updates after every transaction.

## Team

  - __Product Owner__: Hadley Lambeth
  - __Scrum Master__: Braden Walker
  - __Development Team Members__: Brian Beeler, Duevyn Cooke, Brittany Schroeder

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Creating the Database] (#creating-the-database)
    3. [Deleting the Database] (#deleting-the-database)
    4. [Starting the Server] (#starting-the-server)
    1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

   From their Dashboard, users can view their rental history, items they’ve listed for rent, and their favorite items. The Listings view lets users search the marketplace. Detailed listings of each item feature photos, a description, and pricing. A quick click on the “Rent It!” button takes users to the Transaction view, where they can schedule and pay for their rental. After their rental, users can rate their experience as a buyer or a seller.

## Requirements

- Node 0.10.x
- Postgresql 9.1.x
- Express
- Bookshelf
- Knex
- Angular
- See package.json and bower.json for dependency details

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Creating the Database
To install Postgres:
```
brew install postgres
```
To check your version of Postgres:
```
brew info postgres
```
Check to see if Postgres is running:
```
ps -ax | grep postgres
```
Once Postgres is running, create the database:
```
createdb shareaustin
```
To launch psql:
```
psql shareaustin
```

### Adding DummyData.sql (test data for site)
From the command line in project directory
```
psql shareaustin < dummyData.sql
```
### Deleting the Database
From the command line:
```
dropdb shareaustin
```

### Launching App Locally

Create database shareaustin, if it doesn't exist (see 'Creating the Database')

From the command line:
```
node server/server.js
```
In browser:
```
localhost:3000


const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const  passedVars = [email];
  return pool
    .query(query, passedVars)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = 'SELECT * FROM users WHERE id = $1'
  const  passedVars = [id];

  return pool
    .query(query, passedVars)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
  const passedVars = [user.name, user.email, user.password];
  return pool
    .query(query, passedVars)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function(guest_id, limit = 10) {
  const passedVars = [guest_id, limit];
  const query = `
    SELECT 
      reservations.id, 
      reservations.start_date, 
      avg(rating) as average_rating, 
      properties.title, 
      properties.cost_per_night, 
      properties.thumbnail_photo_url, 
      properties.parking_spaces, 
      properties.number_of_bathrooms, 
      properties.number_of_bedrooms
    FROM property_reviews
      JOIN properties ON property_id = properties.id
      JOIN reservations ON reservation_id = reservations.id
    WHERE reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date DESC
    LIMIT $2
  `;

  return pool
    .query(query, passedVars)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let query = `
  SELECT 
    properties.*,
    avg(property_reviews.rating) as average_rating
  FROM properties
    JOIN property_reviews ON properties.id = property_id `;

  const queryParams = [];
  // search by owner
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    query += `WHERE properties.owner_id = $${queryParams.length} `;
  };

  //search by city
  if (options.city){
    queryParams.push(`%${options.city}%`);
    query += `WHERE city LIKE $${queryParams.length} `;
  }

  // search by min price
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    query += `AND cost_per_night >= $${queryParams.length} `;
  };

  // search by max price
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    query += `AND cost_per_night <= $${queryParams.length} `;
  };

  //search by rating
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    query += `
      GROUP BY properties.id
      HAVING avg(property_reviews.rating) >= $${queryParams.length}
      ORDER BY cost_per_night `;
    queryParams.push(limit);
    query += `LIMIT $${queryParams.length}; `;

  } else {  // otherwise return everything..
    queryParams.push(limit);
    query += `
      GROUP BY properties.id
      ORDER BY cost_per_night
      LIMIT $${queryParams.length};`;
  };

  return pool
    .query(query, queryParams)
    .then((result) => { 
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// };

const addProperty = function(property) {
  const query = `
    INSERT INTO properties (
      owner_id, 
      title, 
      description, 
      thumbnail_photo_url, 
      cover_photo_url, 
      cost_per_night, 
      parking_spaces, 
      number_of_bathrooms, 
      number_of_bedrooms, 
      country, 
      street, 
      city, 
      province, 
      post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;

  const queryParams = [
    property.owner_id, 
    property.title, 
    property.description, 
    property.thumbnail_photo_url, 
    property.cover_photo_url, 
    property.cost_per_night, 
    property.parking_spaces, 
    property.number_of_bathrooms, 
    property.number_of_bedrooms, 
    property.country, property.street, 
    property.city, property.province, 
    property.post_code];
  
  return pool
    .query(query, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};

INSERT INTO users (name, email, password) 
  VALUES ('John Smith', 'john.smith@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
  VALUES ('Emily White', 'emily.white@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
  VALUES ('Andrew Parker', 'andrew.parker@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id, active, description, title, thumbnail_photo_url, cover_photo_url, 
            cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) 
    VALUES (1, TRUE, 'Fully renovated property near the beach', 'Beachside Retreat', 'public/images/beachside_retreat _thumb.jpg', 'public/images/beachside_retreat.jpg', 
            200, 1, 2, 3, 'Canada', '123 Main St.', 'Victoria', 'BC', 'V9A7Y2');
INSERT INTO properties (owner_id, active, description, title, thumbnail_photo_url, cover_photo_url, 
            cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) 
    VALUES (2, TRUE, 'Beautiful mountainview estate 10 minutes from downtown', 'Mountainview Mansion', 'public/images/mountainview_mansion_thumb.jpg', 'public/images/mountainview_mansion.jpg', 
            1250, 4, 6, 8, 'Canada', '456 Broadway St.', 'Vancouver', 'BC', 'V1AD6A');
INSERT INTO properties (owner_id, active, description, title, thumbnail_photo_url, cover_photo_url, 
            cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) 
    VALUES (3, FALSE, 'Cottage near the lake with boat access', 'Lakehouse Cottage', 'public/images/lakehouse _cottage_thumb.jpg', 'public/images/lakehouse _cottage.jpg', 
            225, 2, 1, 2, 'Canada', '789 Ontario Rd.', 'Toronto', 'ON', 'M5E6W2');


INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
  VALUES (1, 3, '2020-01-01', '2020-02-02');
INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
  VALUES (2, 1, '2020-03-12', '2020-04-13');
INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
  VALUES (3, 2, '2020-05-15', '2020-06-25');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 3, 1, 4, 'Great property!');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 2, 2, 5, 'Great service!');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 3, 6, 'Excellent experience!');
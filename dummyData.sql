insert into users (first_name, last_name, email, password) values ('Duevyn', 'Cooke', 'd@gmail.com', 'password');
insert into users (first_name, last_name, email, password) values ('Hadley', 'Lambeth', 'h@gmail.com', 'password');
insert into items (seller_id, name,available, price_per_day) values ('1', 'canoe', 'true', '15');
insert into items (seller_id, name,available, price_per_day) values ('1', 'kayak', 'true', '20');
insert into transactions (item_id, buyer_id) values ('1', '2');
insert into transactions (item_id, buyer_id) values ('2', '2');
insert into ratings (transaction_id, seller_rating, buyer_rating) values ('1', '5', '5');
insert into ratings (transaction_id, seller_rating, buyer_rating) values ('2', '4', '4');
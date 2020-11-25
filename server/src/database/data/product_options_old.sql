TRUNCATE product_options RESTART IDENTITY cascade;

INSERT INTO product_options (id, title)
VALUES

(1, 'Brand'),
(2, 'Color');

 SELECT setval('product_options_id_seq', (SELECT MAX(id) from "product_options"));
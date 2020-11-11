TRUNCATE product_options RESTART IDENTITY cascade;

INSERT INTO product_options (id, title)
VALUES

(1, 'Brand'),
(2, 'Color');
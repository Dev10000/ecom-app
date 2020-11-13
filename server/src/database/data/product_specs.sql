TRUNCATE product_specs RESTART
IDENTITY cascade;

INSERT INTO product_specs
    (product_id, product_options_id, value)
VALUES

    ( 1, 1, 'Nike'),
    ( 1, 2, 'Blue'),
    ( 1, 2, 'Red');

 SELECT setval('product_specs_id_seq', (SELECT MAX(id) from "product_specs"));
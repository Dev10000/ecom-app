TRUNCATE product_categories RESTART
IDENTITY cascade;

INSERT INTO product_categories
    (id, title, slug, parent_id)
VALUES

    (1, 'Shoes', 'shoes', null),
    (2, 'Coats', 'coats', null),
    (3, 'Bags', 'bags', null),
    (4, 'Sunglasses', 'sunglasses', null),
    (5, 'Clothes', 'clothes', null),
    (6, 'Phones', 'phones', null),
    (7, 'Laptops', 'laptops', null),
    (8, 'Furnitures', 'furnitures', null),
    (9, 'Microwaves', 'microwaves', null),
    (10, 'Dishwashers', 'dishwashers', null),
    (11, 'Sports', 'sports', null),
    (12, 'Groceries', 'groceries', null),
    (13, 'Jwelleries', 'jwelleries', null),
    (14, 'Stationeries', 'stationeries', null),
    (15, 'Perfumes', 'perfumes', null),
    (16, 'Tablets', 'tablets', null),
    (17, 'Cameras', 'cameras', null),
    (18, 'Watches', 'watches', null),
    (19, 'Cookwares', 'cookwares', null),
    (20, 'Printers', 'printers', null),
    (21, 'Suitcases', 'suitcases', null),
    (22, 'Televisions', 'televisions', null),
    (23, 'Speakers', 'speakers', null),
    (24, 'Bicycles', 'bicycles', null),
    (25, 'Crockeries', 'crockeries', null);

    SELECT setval('product_categories_id_seq', (SELECT MAX(id) from "product_categories"));

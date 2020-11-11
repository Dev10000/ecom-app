TRUNCATE product_categories RESTART IDENTITY cascade;

INSERT INTO product_categories (id, title, slug, parent_id)
VALUES

(1, 'Shoes', 'shoes', null);
TRUNCATE products RESTART IDENTITY cascade;

INSERT INTO products (title ,slug ,description ,price ,weight ,package_size ,discount ,product_category_id ,stock_qty)
VALUES

('Nike Airmax 270 React', 'nike-airmax-270-react', 'air max are always very comfortable fit, clean and just perfect in every way. just the box was too small and scrunched the sneakers up a little bit, not sure if the box was always this small but the 90s are and will always be one of my favorites.', 199.99, 300, '20cm x 40cm x 20cm', 33.33, 1, 40) ;
TRUNCATE product_images RESTART IDENTITY cascade;

INSERT INTO product_images (href ,default_img ,product_id)
VALUES

('./assets/...', true, 1);
SELECT setval('product_images_id_seq', (SELECT MAX(id) from "product_images"));
SELECT setval('product_options_id_seq', (SELECT MAX(id) from "product_options"));
SELECT setval('product_specs_id_seq', (SELECT MAX(id) from "product_specs"));
SELECT setval('products_id_seq', (SELECT MAX(id) from "products"));
SELECT setval('reviews_id_seq', (SELECT MAX(id) from "reviews"));
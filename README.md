## E-Commerce Website

### Features List

- "Should have strong SEO stuff"
- Authentication
    - `User` can create an account
    - `User` can log in
    - `User` has acess to My Profile, where:
        - can see a list of previous orders
        - can edit it's own information
    - Visitors need to be authenticated to be able to: Place Orders
    - Guests can: View Products, Search, Add to Cart
- Store
    - Has `Product` catalog 
    - Products have `Product Categories`
    - Products have `Product Options`
    - Search Functionality

- `Order`
    - `Coupon Code` could be applied
- Shopping Cart
    - Store it in LocalStorage before placing the order
- Backend (Admin Panel)
    - See a list of all Products (consider importing data)
    - See a list of all Users (need some seeders)
    - See a list of all Orders
    - Add New Products
    - Delete Products
    - Edit Products


### Models and Database structure

- User (`users`)
    - `id` <- primary key , auto increments
    - `email` <- unique 
    - `password` <- string
    - `first_name`
    - `last_name`
    - `address`
    - `city`
    - `postal_code`
    - `phone_number`

- Product (`products`)
    - `id` <- primary key , auto increments
    - `title`
    - `slug`
    - `description`
    - `price`
    - `weight`
    - `package_size`
    - `discount`
    - `product_category_id` <- foreign key (constrained)
    - `stock_qty`
    - `deleted_at` <- timestamp | nullable | default: null
    - `created_at` <- timestamp | default: now()
    - `updated_at` <- timestamp | default: now()

- ProductCategory (`product_categories`)
    - `id` <- primary key , auto increments
    - `title`
    - `slug`

- Order (`orders`)
    - `id` <- uuid
    - `product_id` <- foreign key (constrained)
    - `user_id` <- foreign key (constrained)
    - `price`
    - `order_status` <- "ordered" | "dispatched" | "canceled" | "delivered"  

- OrderItem (`order_items`)
    - `id` 
    - `order_id`
    - `quantity`
    - `price`

- CouponCode (`coupon_codes`)
    - `id`
    - `code`
    - `expired_at` <- timestamp | nullable 

- ProductOptions (`product_options`) : color, size, memory, processor, brand
    - `id`
    - `name`

- ProductSpecs (`product_specs`) (!think about a way to set up constraints! Maybe separate table!)
    - `product_id`
    - `product_options_id`
    - `value`

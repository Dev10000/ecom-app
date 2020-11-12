import fs from 'fs';
import { from, to } from 'pg-copy-streams';
import { pool_test_db } from '../../config/database';


// declare const require: any
// import { parser } from 'php-array-parser';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const parser = require('php-array-parser');
// npm install php-array-parser

const array =
    '{"product_specification"=>[{"key"=>"Type", "value"=>"Analog"}, {"key"=>"Style Code", "value"=>"DMK-012-QU02"}, {"key"=>"Ideal For", "value"=>"Girls, Boys"}, {"value"=>"1 Year Warranty for Movement, 6 Months Warranty for Parts"}, {"key"=>"Dial Shape", "value"=>"Round"}, {"key"=>"Strap Color", "value"=>"Dark Green"}, {"key"=>"Case / Bezel Material", "value"=>"Metal Case"}, {"key"=>"Water Resistant", "value"=>"Yes"}, {"key"=>"Other Body Features", "value"=>"Waterproof"}, {"key"=>"Dial Color", "value"=>"Multicolor"}, {"key"=>"Strap Material", "value"=>"Silicone Strap"}]}';

// const obj = JSON.parse(array);
const replaceString = array.replace(/=>/g, ':');
console.log(replaceString);
const obj = JSON.parse(replaceString);
// const obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
console.log(obj);

// SELECT products_flipkart_v2 TABLE
const select_products_flipkart_v2 = async () => {
    const query = `SELECT product_specs_v2 FROM products_flipkart_v2
  LIMIT 100`;

    const res: any = await pool_test_db.query(query);
    res.rows.forEach((element: string) => {
        return console.log(JSON.parse(element));
    });
    // const obj2 = JSON.parse(res.rows);
    // console.log(obj2);
    // return res;
};
select_products_flipkart_v2();
pool_test_db.end();









// parser.parse(`
//   array(
//     "foo" => "bar",
//     "bar" => "foo",
//   );
// `)

// console.log(parser.parse(array))

// > { foo: 'bar', bar: 'foo' }

// const array = `array("product_specification" => [
//     "key" => "Number of Contents in Sales Package",
//     "value" => "Pack of 4"
// ])`;



// const array = `{
//     "product_specification" => [{
//         "key" => "Number of Contents in Sales Package",
//         "value" => "Pack of 4"
//     }, {
//         "key" => "Brand Fit",
//         "value" => "Regular"
//     }, {
//         "key" => "Fabric",
//         "value" => "Cotton"
//     }, {
//         "key" => "Ideal For",
//         "value" => "Men's"
//     }, {
//         "key" => "Style Code",
//         "value" => "J-1-2-4-3"
//     }]
//   }`;



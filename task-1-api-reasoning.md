This document provides response to assessment task 1.

#1 Validation to be used: 
1. The first validation is to ensure that these inputs (userId, productId and quantity) is or are not empty or null; This is important
to ensure that none of them is empty to prevent wrong or crashing execution.
2. Checking the data type: it is important to check the type of data being supplied to avoid 
receiving wrong value type. e.g receiving "one" instead of "1". For the purpose of this work and context, 
they should be integer so that required operations, filtering, and comparism.

3. Value range validation especially for Product Id and Quantity: 
this is to prevent receiving less than or more than the required or expected values.

#2 
The following are possible errors that could occur if not validated:
1. Missing fields: any of the fields from the three including the userId  may not be provided.
2. Invalid datatype: productId and quantity must enssentially be integer except otherwise;
   receiving value of different type would result to incompactibility especially in database field.
   It would also affect program computation too
3. Product not found: If a wrong productId is provided and not validated, the
   product will not be found or does not exist in the products table.

4. Quantity limits exceeded: if range is not validated;
  supplied value might be outrageous leading to quantity limit being extended
5. Quantity supplied is lower than minimum value required. This is similar with 4 only that this type of error
    is due to lower value as to what is required
6. Invalid quantity or Product id: This error will occur when either of the values supplied for
   ProductId and Quantity is not correct even when it passings input validation. 

#3 HTTP Responses status:

1. Successful order creation : The code will be 201. This is because the record or order was successfully save or created.
2. Invalid request body: status code 400 (bad request).
    This is simply because the requst can not be executed or carried out by the programmer but not
    the server naybe due to incomplette data.
4. Product not found: status code 404. This is Because the requested resource (product) does not exist either
   because wrong id was supplied or it was never be created so i prefer it's reported as 404.
5. Server error : status code 500 (Internal Server Error ) This is Because something went wrong
   on the server side and not from the user input or program.





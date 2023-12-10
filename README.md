# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- morgan
- nodemon
- dotenv
- sequelize(mysql)
- cors
- bcryptjs
- nodemailer

---

## Fiture MVP

forgot password with email generate token using nodemailer

---

## URL

_Server_

```
http://localhost:4100
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "status": "Internal Server Error",
  "message": "Something wen't wrong"
}
```

---

## RESTful endpoints

### POST /api/auth/login

> login

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "email":"<email>",
  "password":"<password>",
}
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
        "token":"<token>"
}
}
```

_Response (404)_

```
{
    "status": "Not Found",
    "message": "User Not found Not Found"
}
```

_Response (400)_

```
{
    "status": "Bad request",
    "message": "Invalid Password"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"email\" invalid email input"
}
```

---

### POST /api/auth/forgot-password

> forgot password

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "email":"<email>",
}
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
        "token":"<token>"
}
}
```

_Response (404)_

```
{
    "status": "Not Found",
    "message": "User with this email is not found'"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"email\" invalid email input"
}
```

---

### PATCH /api/auth/reset-password/:token

> rset password or change password

_Request Header_

```
not needed
```

_Request Params_

```
/<token>
```

_Request Query_

```
not needed
```

_Request Body_

```
{
  "password":"<password>",
  "confirmPassword":"<confirmPassword>",
}
```

_Response (200)_

```
{
    "message": "Updated",
    "data": "Password updated sucessfully"
}
```

_Response (400)_

```
{
    "status": "Bad request",
    "message": "Invalid token"
}
```

_Response (400)_

```
{
    "status": "Bad request",
    "message": "token expired"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"password\" password and confirm password must match"
}
```

---

### POST /api/category-news

> create category news

_Request Header_

```
Authorization: "Bearer <token_admin>"

```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "name":"<name>"
}
```

_Response (201)_

```
{
    "message": "Created",
    "data": "Category news created successfully!"
}
```

_Response (400 bad request)_

```
{
    "status": "Bad request",
    "message": "Category already exists"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

---

### GET /api/categories-news

> get all category

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Query_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
  count:<count_products>,
  results:[<category_list>]
}
}
```

---

### POST /api/news/post

> create news

_Request Header_

```
Authorization: "Bearer <token_employee>"
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "title":"<title>",
  "shortDescription":"<shortDescription>",
  "description":"<description>",
  "image":"<image>",
  "categoryId":<number>
}
```

_Response (201)_

```
{
    "message": "Created",
    "data": "News created successfully"
}
```

_Response (404 - Notfound)_

```
{
    "status": "Not Found",
    "message": "Category news not found"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"title\"  length must be at least 10 characters long"
}
```

---

### GET /api/news

> get all news

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Query_

```
?pageNumber=<number>,
?pageSize=<number>
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data":  "data": {
                        count:<count_products>,
                        next:"<URL_next_page>",
                        previous:"<URL_previous_page>",
                        results:[<product_list>]
                      }
}
```

---

### GET /api/news/:newsId

> get detail news

_Request Header_

```
not needed
```

_Request Params_

```
/<news_id>
```

_Request Query_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
  <cart_data>,
  Product:[<product_data>]
}
```

}
_Response (404) Notfound_

```
{
    "message": "Not found",
    "data": "News not found"
}
```

---

### Delete /api/news/:newsId

> delete news

_Request Header_

```
Authorization: "Bearer <token_employee>"
```

_Request Params_

```
/<news_id>
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Deleted",
    "data": "News deleted successfully"
}
```

_Response (404 - Notfound)_

```
{
    "status": "Not Found",
    "message": "News not found"
}
```

_Response (400 - Bad request)_

```
{
    "status": "Bad request",
    "message": "you are not the author of this news"
}
```

---

### PUT /api/news/:newsId

> update news

_Request Header_

```
Authorization: "Bearer <token_employee>"

```

_Request Params_

```
/<news_id>
```

_Request Body_

```
{
  "title":"<title>",
  "shortDescription":"<shortDescription>",
  "description":"<description>",
  "image":"<image>",
  "categoryId":<number>
}
```

_Response (200)_

```
{
    "message": "Updated",
    "data": "News updated successfully!"
}
```

_Response (404 - Notfound)_

```
{
    "status": "Not Found",
    "message": "News not found"
}
```

_Response (404 - Notfound)_

```
{
    "status": "Not Found",
    "message": "Category news not found"
}
```

_Response (400 - Bad request)_

```
{
    "status": "Bad request",
    "message": "you are not the author of this news"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"title\"  length must be at least 10 characters long"
}
```

---

### POST /api/user/employee

> create employee

_Request Header_

```
Authorization: "Bearer <token_admin>"

```

_Request Params_

```
not needed
```

_Request Body_

```
{
    "firstName":"<string>",
    "lastName":"<string>",
    "email":"<string>",
    "password":"<string>",
    "confirmPassword":"<string>"
}
```

_Response (201)_

```
{
    "message": "Created",
    "data": "Created employee successfully!"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"password\" password and confirm password must match"
}
```

_Response (400 - Bad request)_

```
{
    "status": "Bad request",
    "message": "User already exist"
}
```

---

### PUT /api/user/employee/:employeeId

> update employee

_Request Header_

```
Authorization: "Bearer <token_employee>"

```

_Request Params_

```
/<employee_id>
```

_Request Body_

```
{
    "firstName":"<string>",
    "lastName":"<string>",
    "email":"<string>",
    "password":"<string>",
    "confirmPassword":"<string>"
}
```

_Response (200)_

```
{
    "message": "Updated",
    "data": "User updated successfully!"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"password\" password and confirm password must match"
}
```

_Response (404 - Not found)_

```
{
    "status": "Not Found",
    "message": "User not found"
}
```

_Response (400 - Bad request)_

```
{
    "status": "Bad request",
    "message": "User already exist"
}
```

_Response (400 - Bad request)_

```
{
    "status": "Bad request",
    "message": "you are not the owner"
}
```

---

### GET /api/user/employee/:employeeId

> get detail profile employee

_Request Header_

```
Authorization:"Bearer <token_employee>"
```

_Request Params_

```
/<employee_id>
```

_Request Query_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
  <user_profile>
}
```

}
_Response (404) Notfound_

```
{
    "message": "Not found",
    "data": "User not found"
}
```

---

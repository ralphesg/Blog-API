# Blog API - Documentation

## Resources

- Admin User
    - email: "admin@mail.com"
    - password: "admin123"

- Normal User
    - email: "test@mail.com"
    - password: "newPass1234"


## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "username": "sampleUser",
        "password": "samplePw123"
    }

    ```
      
### Blogs

#### [POST] - "/blogs/addBlog"

- Sample Request Body

    ```json

    {
        "title": "sample blog",
        "content": "sample content",
        "description": "sample description"
    }

    ```

#### [GET] - "/blogs/getBlogs"

- No Request Body

#### [GET] - "/blogs/getBlogs/:blogid"

- No Request Body

#### [PATCH] - "/blogs/updateBlog/:blogid"

- Sample Request Body

    ```json

    {
        "title": "sample blog",
        "content": "sample content update",
        "description": "sample description update"
    }

    ```

#### [DELETE] - "/blogs/deleteBlog/:blogid"

- No Request Body

#### [POST] - "/blogs/addComment/:blogid"

- Sample Request Body

    ```json

    {
        "comment": "Sample blog comment",
    }

    ```
#### [GET] - "/blogs/getComments/:id"

- No Request Body

#### [DELETE] - "/blog/deleteBlogComment/:blogid/:commentid"

- No Request Body
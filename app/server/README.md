# Backend endpoints
## Auth:
### 1. Register
- method: ``` post ```
- sample url: ```http://localhost:5000/auth/register```
- request body: ``` {name: example, email: example@gmail.com, password: example}```
- sample response: 
    ```sh
    {
        "id": 76,
        "name": "Monkey D. Luffy",
        "email": "lufytimeskip@onepiece.d",
        "password": "$2b$10$jH.TcHgv/aLKEjKFtw9MBezZJnF.tvnZSNchJbh7C4SzUR0KIGB7a",
        "refresh_token": null,
        "role": "user"
    }
    ```
### 2. Login 
- method: ```post```
- sample url: ```http://localhost:5000/auth/login```
- request body ```{email: example@gmail.com, password: example}```
- sample response: 
    ```sh
    {
        "msg": "Logged in successfully.",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Znl0aW1lc2tpcEBvbmVwaWVjZS5kIiwiaWF0IjoxNjY1MjYxNTQ5LCJleHAiOjE2NjUyNjIxNDl9.r8xV9P7PRgkOg7j85ilHPLCv12eSCxG9NgsYjTWk4XI",
        "refreshToken": "zx0aozoj1PYK8iZZ7O73BLXjJGjULjeswpj8T9EvgKGRB2oXDiwMq7q4voFQeEdIhJMq6CeywKWZpdmhYDfsvZDb1jUN2m2XFfzU",
        "user": {
            "id": 76,
            "name": "Monkey D. Luffy",
            "email": "lufytimeskip@onepiece.d",
            "password": "$2b$10$jH.TcHgv/aLKEjKFtw9MBezZJnF.tvnZSNchJbh7C4SzUR0KIGB7a",
            "refresh_token": null,
            "role": "user"
        }
    }
    ```
### 3. Refresh token
- method: ```post```
- sample url: ```http://localhost:5000/auth/refresh```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- request body: ``` {refreshToken: YOUR-REFRESH-TOKEN}```
- sample response: 
    ``` sh
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Znl0aW1lc2tpcEBvbmVwaWVjZS5kIiwiaWF0IjoxNjY1MjYyNTY4LCJleHAiOjE2NjUyNjMxNjh9.ltKt9mEc9tHxjABju51vkkTDTdeOzuEZ95O8Mi0yd_M"
    }
    ```
## User:
### 1. Profile
- method: ```get```
- sample url: ```http://localhost:5000/user/profile```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
    {
        "id": 76,
        "name": "Monkey D. Luffy",
        "email": "lufytimeskip@onepiece.d",
        "password": "$2b$10$jH.TcHgv/aLKEjKFtw9MBezZJnF.tvnZSNchJbh7C4SzUR0KIGB7a",
        "refresh_token": "gZFmWR74EUpOpMaXiN6flYja43EUWNiCppsgPLnMrNivuS0bUemrb99vUqugRTXLsZAmZlvUkMsYvhGA3aCzlBUq3l7XFItfDuFm",
        "role": "user"
    }
    ```
        
### 2. Delete User
> User must have administrator role to access this feature
- method: ```get```
- sample url: ```http://localhost:5000/user/delete?id=30```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
    {
        "message": "User with id 67 has been deleted",
        "result": true
    }
    ```

### 3. Get all users
> User must have administrator role to access this feature.
- method: ```get```
- sample url: ```http://localhost:5000/user/all```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
    [
    {
        "id": 28,
        "name": "user1",
        "email": "user1",
        "role": "user"
    },
    {
        "id": 29,
        "name": "user2",
        "email": "user2",
        "role": "user"
    },
      // user3, ... 
    ]
    ```

### 4. Reset password
- method: ```post```
- sample url: ```http://localhost:5000/user/reset-password```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- request body: ``` {new_password: YOUR-NEW-PASSWORD}```
- sample response: 
    ```sh
    {
        "message": "Password changed successfully",
        "result": true
    }
    ```
    
### 5. Change username
- method: ```post```
- sample url: ```http://localhost:5000/user/set-name```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- request body: ``` {new_name: YOUR-NEW-NAME}```
- sample response: 
    ```sh
    {
        "message": "Name changed successfully",
        "result": true
    }
    ```
## Rating
### 1. Rate a movie
- method: ```post```
- sample url: ```http://localhost:5000/rating/rate-movie```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- request body: ``` {movie_id: 'ty5f', score: 9}```
- sample response: 
    ```sh
    {
        "msg": "new rating created",
        "result": {
            "id": 14,
            "user_id": 71,
            "movie_id": "ty5f",
            "score": 9
        }
    }
    ```
    
### 2. Get movie ratings
- method: ```get```
- sample url: ```http://localhost:5000/rating/movie-ratings?movie_id=qyr5f```
- sample response: 
    ```sh
   [
    {
        "id": 10,
        "user_id": 21,
        "score": 2
    },
    {
        "id": 11,
        "user_id": 32,
        "score": 9
    },
    {
        "id": 12,
        "user_id": 36,
        "score": 3
    }
    ]
    ```
    
### 3. Get list of user ratings
- method: ```get```
- sample url: ```http://localhost:5000/rating/user-ratings```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
    [
    {
        "id": 14,
        "movie_id": "ty5f",
        "score": 8
    }
    ]
    ```
    
## Review
### 1. Add a review
- method: ```post```
- sample url: ```http://localhost:5000/review/add```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- request body: ``` {movie_id: 'qur5f', content: 'This is the best movie I have ever seen'}```
- sample response: 
    ```sh
   {
        "message": "review added",
        "result": {
            "id": 10,
            "user_id": 71,
            "movie_id": "qur5f",
            "content": "This is the best movie I have ever seen"
        }
    }
    ```
    
### 2. Edit a review
- method: ```post```
- sample url: ```http://localhost:5000/review/edit```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- request body: ``` {review_id: 10, new_content: 'This is the best movie I have ever seen'}```
- sample response: 
    ```sh
   {
        "message": "review edited",
        "result": true
    }
    ```
    
### 3. Delete a review
> Either administrator or owner can be able to delete review
- method: ```get```
- sample url: ```http://localhost:5000/review/delete?id=10```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
  {
    "message": "review 10 deleted"
    }
    ```
    
### 4. Get all reviews of a movie
- method: ```get```
- sample url: ```http://localhost:5000/review/movie-reviews?movie_id=qur5f```
- sample response: 
    ```sh
   [
    {
        "id": 4,
        "movie_id": "qur5f",
        "content": "This is the best movie I have ever seen",
        "user_id": 33
    },
    {
        "id": 5,
        "movie_id": "qur5f",
        "content": "This is sick, I do really recommend it",
        "user_id": 71
    },
    ]
    ```

### 5. Get all user reviews
- method: ```get```
- sample url: ```http://localhost:5000/review/all```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
   [
    {
        "id": 8,
        "movie_id": "qur5f",
        "content": "This is sick",
        "user_id": 71
    },
    {
        "id": 10,
        "movie_id": "qur5f",
        "content": "the best ever",
        "user_id": 71
    }
    ]
    ```
## Bookmark
### 1. Add a bookmark
- method: ```get```
- sample url: ```http://localhost:5000/bookmark/add?movie_id=ty5f```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
   Bookmark has been added successfully
    ```
### 2. Remove a bookmark
- method: ```get```
- sample url: ```http://localhost:5000/bookmark/remove?movie_id=ty5f```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
   Bookmark has been deleted successfully
    ```
### 3. Get all movie bookmarks
- method: ```get```
- sample url: ```http://localhost:5000/bookmark/all```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
    [
    "r2tyz",
    "tw5r"
    ]
    ```
## Watched 
### 1. Add a movie to watched list
- method: ```get```
- sample url: ```http://localhost:5000/watched/add?movie_id=wtr30o```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
  Movie with id 'wtr30o' has been added to watched list successfully
    ```
    
### 2. Remove a movie from watched list
- method: ```get```
- sample url: ```http://localhost:5000/watched/remove?movie_id=wtr30o```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
     Movie with id 'wtr30o' has been deleted from watched list
    ```
  
### 3. Remove a movie from watched list
- method: ```get```
- sample url: ```http://localhost:5000/watched/all```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
    [
        "y2hzw",
        "r2htw",
        "wtr30o"
    ]
    ``` 
    
### 3. Remove a movie from watched list
- method: ```get```
- sample url: ```http://localhost:5000/watched/all```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
    [
        "y2hzw",
        "r2htw",
        "wtr30o"
    ]
    ``` 
    
### 4. Get number of views of a movie
- method: ```get```
- sample url: ```http://localhost:5000/watched/views?movie_id=y2hzw```
- request header: ```{x_authorization: YOUR-ACCESS-TOKEN} ```
- sample response: 
    ```sh
    {
        "movie_id": "y2hzw",
        "views": 3
    }
    
    ``` 

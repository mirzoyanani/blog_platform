Authentication Endpoints

1. Register
   Endpoint: /api/auth/register
   Request Type: POST
   Parameters:
   - name (string): User's name
   - email (string): User's email address
   - password (string): User's password
     Expected Response:
   - Success (200):
     - message (string): User registered successfully
   - Error:
     - code (number): Error code
     - message (string): Error message
2. Login
   Endpoint: /api/auth/login
   Request Type: POST
   Parameters:

   - email (string): User's email address
   - password (string): User's password
     Expected Response:
   - Success (200):
     - token (string): JWT token for authentication
   - Error:
     - code (number): Error code
     - message (string): Error message

3. Forgot Password
   Endpoint: /api/auth/forgot-password
   Request Type: POST
   Parameters:

   - email (string): User's email address
     Expected Response:
   - Success (200):
     - token (string): JWT token for password reset
   - Error:
     - code (number): Error code
     - message (string): Error message

4. Verify Reset Code
   Endpoint: /api/auth/verify-code
   Request Type: POST
   Parameters:

   - code (string): Verification code
     Expected Response:
   - Success (200):
     - token (string): New JWT token for authentication
   - Error:
     - code (number): Error code
     - message (string): Error message

5. Reset Password
   Endpoint: /api/auth/reset-password
   Request Type: POST
   Parameters:
   - password (string): New password
     Expected Response:
   - Success (200):
     - message (string): Password updated successfully
   - Error:
     - code (number): Error code
     - message (string): Error message

Blog Endpoints

1. Create Blog
   Endpoint: /api/blogs
   Request Type: POST
   Parameters:

   - title (string): Title of the blog
   - body (string): Content of the blog
     Required Headers:
   - Authorization: Bearer <JWT Token>
     Expected Response:
   - Success (200):
     - message (string): Blog added successfully
   - Error:
     - code (number): Error code
     - message (string): Error message

2. Get Blogs
   Endpoint: /api/blogs
   Request Type: GET
   Expected Response:

   - Success (200):
     - items (array): Array of blog objects with properties like title, body, author, creation_date, update_date, and id
   - Error:
     - code (number): Error code
     - message (string): Error message

3. Delete Blog
   Endpoint: /api/blogs/:id
   Request Type: DELETE
   Parameters:
   - id (string): ID of the blog to be deleted
     Required Headers:
   - Authorization: Bearer <JWT Token>
     Expected Response:
   - Success (200):
     - message (string): Blog with specified ID deleted successfully
   - Error:
     - code (number): Error code
     - message (string): Error message
4. Update Blog Info
   Endpoint: /api/blogs/:id
   Request Type: PUT
   Parameters: - title (string, optional): Updated title of the blog - body (string, optional): Updated content of the blog
   Required Headers: - Authorization: Bearer <JWT Token>
   Expected Response: - Success (200): - message (string): Blog with specified ID updated successfully - Error: - code (number): Error code - message (string): Error message

Comment Endpoints

1. Create Comment
   Endpoint: /api/comments
   Request Type: POST
   Parameters:

   - blogId (string): ID of the blog to which the comment belongs
   - body (string): Content of the comment
     Required Headers:
   - Authorization: Bearer <JWT Token>
     Expected Response:
   - Success (200):
     - message (string): Comment added successfully
   - Error:
     - code (number): Error code
     - message (string): Error message

2. Get Comments
   Endpoint: /api/comments/:blogId
   Request Type: GET
   Parameters:

   - blogId (string): ID of the blog to retrieve comments for
     Expected Response:
   - Success (200):
     - items (array): Array of comment objects with properties like id and body
   - Error:
     - code (number): Error code
     - message (string): Error message

3. Delete Comment
   Endpoint: /api/comments/:id
   Request Type: DELETE
   Parameters:
   - id (string): ID of the comment to be deleted
     Required Headers:
   - Authorization: Bearer <JWT Token>
     Expected Response:
   - Success (200):
     - message (string): Comment with specified ID deleted successfully
   - Error:
     - code (number): Error code
     - message (string): Error message

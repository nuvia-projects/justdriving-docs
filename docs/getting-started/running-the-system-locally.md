---
sidebar_position: 4
---

# Running the system locally

This section describes how to start the Just Driving platform on your own machine once dependencies and the environment are set up.

## 1. Start MySQL

1. Make sure your local MySQL server is running.
2. Create a database (if it does not already exist), for example:
```mysql
CREATE DATABASE just_driving CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
3. Ensure your `.env` file points to this database:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=just_driving
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
```

## 2. Run migrations (and seeders)

From the project root:


```bash
php artisan migrate
php artisan db:seed
```

## 3. Build frontend assets

Because the project uses Laravel Mix with Webpack:


```bash
npm run dev # for development
```
```bash
npm run watch # during active development
```
```bash
npm run production # for a production-like build
```


## 4. Serve the application

### Option A: Laravel Herd (recommended)

1. Ensure the project is in a directory managed by Laravel Herd.
2. Configure the project domain in Herd (for example `just-driving.test`).
3. Open the URL in your browser: http://justdriving.test

Herd will automatically point this domain to the `public` directory.

### Option B: Artisan serve

From the project root:
```bash
php artisan serve
```
**OR**
```bash
herd php artisan serve
```

Then open: http://127.0.0.1:8000



### 5. Verify the application

- Log in with a known user (admin/teacher/student) or create a test user if the flows support it.
- Confirm that:
  - The homepage loads without errors.
  - Basic routes (dashboard, login, etc.) work.
  - Database reads/writes (e.g. creating a test entity) succeed.

If you want, the next section can be “Configuration files and .env variables” or “Build & deployment process”.

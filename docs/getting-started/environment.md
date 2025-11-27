---
sidebar_position: 3
---

# Environment Setup

This page describes the one-time steps required to prepare a local environment for working on the Just Driving repository. After completing these steps, you can follow the “Running Locally” guide for day-to-day development.

## 1. Clone the repository

1. Open a terminal.
2. Clone the main repository and change into the project directory:
```bash
git clone <your-git-url>/justdriving.git
cd just-driving
```
3. Check out the main development branch (for example `master` or `main`), depending on your workflow.

## 2. Create the environment file

1. Copy the example environment file:
```bash
cp .env.example .env
```
2. Open `.env` in your editor and update at least the following sections.

### Application basics
```dotenv
APP_NAME="Just Driving"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://justdriving.test
```

### Database (MySQL)
```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=justdriving
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
```

### Queues and cache (Redis)
```dotenv
QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```


### Mail (Mailtrap for local, SparkPost for live)
```dotenv
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="no-reply@justdriving.local"
MAIL_FROM_NAME="${APP_NAME}"
```


(Production environments override these settings to use SparkPost.)

### SMS (Twilio)
```dotenv
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM=your_twilio_phone_number
```


### Payments (Stripe)
```dotenv
STRIPE_KEY=your_stripe_public_key
STRIPE_SECRET=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 3. Install PHP and Node dependencies

1. Install PHP dependencies:
```bash
composer install
```
2. Install front-end dependencies:
```bash
npm install
```

No build or serve commands are covered here; those are part of the “Running Locally” guide.

## 4. Generate app key and run migrations

1. Generate the application key:
```bash
php artisan key:generate
```
2. Run database migrations (and seeders if available):
```bash
php artisan migrate
php artisan db:seed
```


At this point the environment is configured and the database schema is in place. You can now proceed to the “Running Locally” page to start the application, queues, and front-end build.













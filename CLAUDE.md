# Updated Authentication Specification

## Authentication Philosophy

The application should minimize signup friction.

Users should be able to start tracking calories as quickly as possible.

The primary goal is daily usage, not account verification.

---

## Account Creation

Required:

* Username
* Password

Optional:

* Email Address

Example:

Username:
john123

Password:

---

Email:
(optional)

---

## Login

Users can log in using:

Username + Password

Email is not required.

---

## Session Persistence

Requirements:

* Stay logged in across browser sessions
* Auto-login when a valid session exists
* Redirect authenticated users directly to Dashboard

Users should rarely need to log in again.

---

## Password Recovery

### If Email Exists

Allow:

* Forgot Password
* Password Reset

### If No Email Exists

Display:

"Password recovery is unavailable because no email address is associated with this account."

---

## Guest Mode (Optional MVP+)

Allow users to use the application without creating an account.

Guest data stored locally.

Prompt account creation later to sync and backup data.

Not required for initial MVP.

---

## Security Requirements

Passwords must never be stored in plaintext.

Store:

* Password Hash
* Salt

Use secure password hashing.

Never expose passwords to administrators or application code.

---

## Profile Data

profiles

id

username

email (nullable)

sex

age

height_cm

current_weight_kg

target_weight_kg

activity_level

goal_type

maintenance_calories

daily_calorie_goal

protein_goal

carb_goal

fat_goal

created_at

updated_at

---

## User Experience Goal

Signup should take less than 30 seconds.

Preferred flow:

1. Create username
2. Create password
3. Enter basic body stats
4. Receive calorie recommendations
5. Start tracking immediately

No mandatory email verification.

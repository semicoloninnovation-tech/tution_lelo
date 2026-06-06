# Member Module Backend (PHP)

These files are ready to deploy for:
- Members
- Attendance
- Tests
- Teacher Login Authentication
- Student Requests

## Files

Upload all files from `backend/tutor-api/` to your server path:
- `https://vnaksh.com/tutor/`

Required files:
- `bootstrap.php`
- `teacherLogin.php`
- `getMembers.php`
- `createMember.php`
- `getAttendance.php`
- `createAttendance.php`
- `getTests.php`
- `createTest.php`
- `studentRequest.php`
- `getStudentRequests.php`
- `approveStudentRequest.php`
- `deleteStudentRequest.php`

## Database setup

1. Open phpMyAdmin (or MySQL CLI).
2. Run SQL from:
- `backend/sql/member_module.sql`

It creates DB/table structure and seed data.

## Important config

Update DB credentials inside `bootstrap.php`:
- `$host`
- `$dbname`
- `$user`
- `$pass`

## Teacher login endpoint

### POST
- `/teacherLogin.php`
  - payload: `{ "email": "...", "password": "..." }`
  - success: `{ "status": "success", "teacher": { id, name, email, subject } }`

Seed teacher credentials:
- `neha@tuitionlelo.com` / `teacher123`
- `imran@tuitionlelo.com` / `teacher123`

> Passwords are stored as bcrypt hashes.

## Endpoint contracts

### GET
- `/getMembers.php` -> `[{ id, name, role, className, subject }]`
- `/getAttendance.php` -> `[{ date, studentId, teacherId, status }]`
- `/getTests.php` -> `[{ id, title, className, subject, date, createdBy }]`

### POST
- `/createMember.php`
  - `{ id, name, role, className, subject }`
- `/createAttendance.php`
  - `{ date, studentId, teacherId, status }`
- `/createTest.php`
  - `{ id, title, className, subject, date, createdBy }`
- `/studentRequest.php`
  - `{ name, studentClass, location, contact, subject, subjects, tutor }`
- `/approveStudentRequest.php`
  - `{ id }`
- `/deleteStudentRequest.php`
  - `{ id }`

All POST success responses:
- `{ "status": "success", "message": "..." }`

## Frontend status

Frontend is integrated and teacher login now authenticates via:
- `https://vnaksh.com/tutor/teacherLogin.php`

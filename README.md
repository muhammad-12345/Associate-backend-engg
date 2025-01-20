# Associate-backend-engg

# Backend Architechture and report

The project comprised of two major tasks as listed:
Task 1: Workshop Management System
in this task we have to create a backend system to manage workshops including mentors, learners, and activities. This system should allow mentors to create and manage workshops and activities, while enabling learners to enroll and view their enrolled workshops.
Requirements:
Develop an API to:
Create workshops (mentor-only access).
Add multiple activities to workshops.
Add APIs to update or delete activities within workshops.
Enable learners to enroll in workshops.
Allow learners to view workshops they are enrolled in, including details of their activities.

The API documentation are also uploaded in the repository.


Task 2: Enrollment Notifications
In this task we had to Add a notification system for workshop enrollment updates.
Requirements:
Notify mentors when learners enroll in their workshops.
Notify learners when their enrollment is confirmed.
Manage user preferences (opt-ins/opt-outs) for notifications.

![image](https://github.com/user-attachments/assets/75589c52-67a5-4e8e-a006-164ba737f38b)


The diagram above depicts the basic structure of the system where the user sends request which is recieved by the server. The server verifies the token and then proceed with the request. it communicates with the DB and then send response to the user. The email service is used for sending the notifcation to mentor or learner.

- Firebase Admin SDK was used for Firestore database interaction and user authentication.
- NodeMailer was implemented for email notifications.
- Postman was used for API testing.


# Challanges and pending work
nodemailer integration caused problem and the endpoint for enrolling of student was not working properly. Therefore, Task 2 should be considered incomplete.

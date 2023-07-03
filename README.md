## Live Link

Hosted in Firebase -> [Lens Academy](https://lens-academy-59553.web.app/)

## Lens Academy Website Features

- Lens Academy is a web application that provides an online learning platform
  for various classes. Users can explore different classes, book seats, and
  interact with instructors. The application offers a user-friendly interface
  with a registration and login system, personalized dashboards, and
  administrative functionalities.

- Registration & Login System: Users can register and log in to access the full
  features of the platform. The login page allows users to enter their email and
  password, with an option for social login. The registration page collects
  necessary information such as name, email, password, and optional details like
  photo URL, gender, phone number, and address.

- Homepage: The homepage features a dynamic slider section with relevant images,
  text, and information. It also showcases popular classes and instructors,
  based on the number of students. An additional section with attractive design
  and animations adds an engaging touch.

- Instructors Page: This page displays all the instructors along with their
  details, such as image, name, email, and optionally, the number and names of
  classes they teach. Users can click on the "See Classes" button to explore
  classes offered by a specific instructor.

- Classes Page: The classes page presents a comprehensive list of approved
  classes. Each class card includes information like the class image, name,
  instructor name, available seats, and price. Users can select a class, but the
  selection button is disabled for logged-out users and admin/instructor
  accounts. The class card background turns red if there are no available seats.

- Student Dashboard: The private student dashboard allows students to manage
  their selected and enrolled classes. The "My Selected Classes" section
  displays all the classes that a student has booked. It provides relevant class
  information and options to delete or pay for a selected class. After
  successful payment, the class is moved to the "My Enrolled Classes" section.

- Payment: The payment functionality allows students to proceed with class
  bookings. Clicking the "Pay" button redirects students to the payment page,
  where they can finalize the payment process. Upon successful payment, the
  available seats for the class decrease by 1, and the class details appear in
  the "My Enrolled Classes" section. A payment history page displays a student's
  payment records, sorted in descending order.

- Instructor Dashboard: The private instructor dashboard offers instructors the
  ability to add classes and manage their existing classes. The "Add a Class"
  page features a form where instructors can provide class details, including
  the class name, image, available seats, and price. Instructors can view their
  added classes in the "My Classes" section, which includes information on class
  status, total enrolled students, feedback, and an update button.

- Admin Dashboard: The private admin dashboard enables admins to manage classes
  and users. The "Manage Classes" page displays all classes added by
  instructors, showing relevant information such as the class image, name,
  instructor details, available seats, price, and status. Admins can approve or
  deny classes, and provide feedback to instructors. The "Manage Users" page
  allows admins to view user information and grant roles as instructors or
  admins.

## Technologies Used

- Front-end: HTML, CSS, JavaScript, React.js

- Back-end: Node.js, Express.js

- Database: MongoDB

- Authentication: JWT (JSON Web Tokens)

- Data Fetching: Axios, React Query

finish 
const events = [
  {
    clubName: 'AI Club',
    eventsData: [
      { title: 'AI Hackathon', date: '2024-04-01', venue: 'Online' },
      { title: 'Guest Lecture on Machine Learning', date: '2024-03-20', venue: 'Club Auditorium' },
      { title: 'Introduction to Neural Networks Workshop', date: '2024-04-10', venue: 'Online' },
      { title: 'Panel Discussion: Ethics in AI', date: '2024-04-15', venue: 'Club Hall' },
      { title: 'AI Demo Day', date: '2024-04-25', venue: 'Main Auditorium' },
      { title: 'AI for Social Good Symposium', date: '2024-05-05', venue: 'Virtual Event' },
      { title: 'Advanced AI Algorithms Seminar', date: '2024-05-15', venue: 'Club Auditorium' },
      { title: 'Machine Learning Project Showcase', date: '2024-05-20', venue: 'Online' },
      { title: 'AI Club Annual Conference', date: '2024-05-30', venue: 'Convention Center' },
      { title: 'Workshop on AI Applications in Healthcare', date: '2024-06-10', venue: 'Online' }
    ],
    imageUrl: "aiclub (1).jpg",
    description: "The AI Club is focused on promoting the research, development, and application of artificial intelligence. We organize workshops, seminars, and hackathons to help students learn and build AI-powered projects.",
    president: "Dr. Amelia Sharma",
    mediaLead: ["Riya Singh", "Pranav Kumar"],
    coordinator: ["Vaishnavi Patel", "Yash Mehta"],
    email:"aiclubvitbhopal@gmail.com",
    phone:"987654321",
    volunteer: ["Shivam Gupta", "Riya Verma", "Arjun Singh", "Sonia Agarwal", "Mayank Tiwari"]
  },
  {
    clubName: 'Android Club',
    eventsData: [
      { title: 'App Development Workshop', date: '2024-03-25', speaker: 'John Doe' },
      { title: 'Android Study Group Meeting', date: '2024-04-05', location: 'Main Library' },
      { title: 'Introduction to Kotlin Programming', date: '2024-04-15', venue: 'Club Hall' },
      { title: 'Android App Design Competition', date: '2024-04-20', venue: 'Online' },
      { title: 'Android App Deployment Seminar', date: '2024-04-30', venue: 'Main Auditorium' },
      { title: 'Advanced Android Development Workshop', date: '2024-05-10', venue: 'Virtual Event' },
      { title: 'Android App Testing Strategies Session', date: '2024-05-20', venue: 'Club Auditorium' },
      { title: 'Android App Monetization Webinar', date: '2024-06-05', venue: 'Online' },
      { title: 'Android Club Annual Conference', date: '2024-06-15', venue: 'Convention Center' },
      { title: 'Android App Showcase Event', date: '2024-06-25', venue: 'Online' }
    ],
    imageUrl: "android.jpg",
    email:"androidclubvitbhopal@gmail.com",
    phone:"987654321",
    description: "The Android Club empowers students to develop innovative mobile applications using the Android platform. We provide workshops, seminars, and competitions to help students gain the necessary skills and knowledge.",
    president: "Mr. Abhay Verma",
    mediaLead: ["Riya Malik", "Rohan Das"],
    coordinator: ["Nikita Kapoor", "Sahil Malhotra"],
    coLead: {
      web: ["Abhishek Singh", "Pooja Sharma", "Rahul Mehta"],
      app: ["Riya Dhillion", "Yash Kapoor", "Aditya Chaudhary"],
      ai: ["Priyanka Singh", "Aman Saxena", "Naina"]
    },
    volunteer: ["Shivani Gupta", "Rahul Verma", "Arpita Singh", "Sonam Agarwal", "Manoj Tiwari"]
  },
  {
    clubName: 'GDSC',
    eventsData: [
      { title: 'Workshop on Google Cloud Platform', date: '2024-04-05', venue: 'Virtual' },
      { title: 'GDSC Introduction and Orientation', date: '2024-04-10', venue: 'Club Hall' },
      { title: 'Web Development Fundamentals Workshop', date: '2024-04-15', venue: 'Online' },
      { title: 'Hackathon Preparation Session', date: '2024-04-25', venue: 'Main Auditorium' },
      { title: 'Machine Learning Basics Workshop', date: '2024-05-05', venue: 'Virtual Event' },
      { title: 'Google Developer Day Conference', date: '2024-05-10', venue: 'Convention Center' },
      { title: 'Android App Development Workshop', date: '2024-05-15', venue: 'Club Auditorium' },
      { title: 'GDSC Meet and Greet Social Event', date: '2024-05-25', venue: 'Online' },
      { title: 'GDSC Annual Summit', date: '2024-06-05', venue: 'Convention Center' },
      { title: 'Project Showcase and Awards Ceremony', date: '2024-06-15', venue: 'Online' }
    ],
    imageUrl: "google.jpg",
    email:"gdscclubvitbhopal@gmail.com",
    phone:"987654321",
    description: "GDSC (Google Developer Student Clubs) introduces students to mobile and web development using Google's technologies. We host workshops, hackathons, and conferences to help students grow as developers and build projects.",
    president: "Ms. Ananya Singh",
    mediaLead: ["Rajat Verma", "Aarav Kapoor"],
    coordinator: ["Nisha Sharma", "Ankit Singh"],
    coLead: {
      web: ["Aditi Gupta", "Rohit Malhotra", "Sakshi Sharma"],
      app: ["Akash Verma", "Riya Kapoor", "Vikas Singh"],
      ai: ["Aayushi Singh", "Manish Verma", "Shreya Patel"]
    },
    volunteer: ["Rohan Gupta", "Neha Verma", "Siddharth Singh", "Anjali Agarwal", "Harsh Tiwari"]
  },
  {
    clubName: 'E-Cell Club',
    eventsData: [
      { title: 'Entrepreneurship Bootcamp', date: '2024-03-20', venue: 'Club Hall' },
      { title: 'Startup Pitching Workshop', date: '2024-03-25', venue: 'Virtual' },
      { title: 'Funding Opportunities Seminar', date: '2024-04-05', venue: 'Main Auditorium' },
      { title: 'Business Model Canvas Workshop', date: '2024-04-10', venue: 'Online' },
      { title: 'Marketing Strategies for Startups', date: '2024-04-15', venue: 'Club Auditorium' },
      { title: 'Networking Mixer for Entrepreneurs', date: '2024-04-25', venue: 'Online' },
      { title: 'E-Cell Club Annual Conference', date: '2024-05-05', venue: 'Convention Center' },
      { title: 'Product Development Masterclass', date: '2024-05-10', venue: 'Virtual Event' },
      { title: 'Investor Pitch Event', date: '2024-05-20', venue: 'Main Auditorium' },
      { title: 'Startup Showcase and Awards Ceremony', date: '2024-05-30', venue: 'Online' }
    ],
    imageUrl: "ecell.jpg",
    email:"ecellclubvitbhopal@gmail.com",
    phone:"987654321",
    description: "The E-Cell Club fosters an entrepreneurial spirit among students, providing resources and guidance for starting and growing businesses. We conduct bootcamps, workshops, and networking events to inspire and empower future entrepreneurs.",
    president: "Mr. Akash Gupta",
    mediaLead: ["Ananya Singh", "Rahul Sharma"],
    coordinator: ["Sneha Kapoor", "Vishal Singh"],
    coLead: {
      web: ["Neha Gupta", "Rohit Singh", "Sakshi Verma"],
      app: ["Vikram Kapoor", "Ria Sharma", "Amit Verma"],
      ai: ["Shivam Singh", "Nisha Verma", "Aryan Patel"]
    },
    volunteer: ["Riya Singh", "Amit Kumar", "Priya Verma", "Ankit Singh", "Harshit Tiwari"]
  },
  {
    clubName: 'Insight Club',
    eventsData: [
      { title: 'Data Analytics Workshop', date: '2024-03-25', venue: 'Online' },
      { title: 'Introduction to Data Science Seminar', date: '2024-04-05', venue: 'Club Hall' },
      { title: 'Machine Learning Applications in Business', date: '2024-04-15', venue: 'Main Auditorium' },
      { title: 'Data Visualization Techniques Session', date: '2024-04-20', venue: 'Online' },
      { title: 'Big Data Analytics Workshop', date: '2024-04-30', venue: 'Virtual Event' },
      { title: 'Insight Club Annual Conference', date: '2024-05-10', venue: 'Convention Center' },
      { title: 'Predictive Analytics Workshop', date: '2024-05-15', venue: 'Club Auditorium' },
      { title: 'Business Intelligence Panel Discussion', date: '2024-05-25', venue: 'Online' },
      { title: 'Data Science Hackathon', date: '2024-06-05', venue: 'Main Auditorium' },
      { title: 'Data-driven Decision Making Seminar', date: '2024-06-15', venue: 'Online' }
    ],
    imageUrl: "insight.png",
    email:"insightclubvitbhopal@gmail.com",
    phone:"987654321",
    description: "The Insight Club delves into the world of data science and analytics, providing students with the skills and knowledge needed to analyze and interpret data effectively. We offer workshops, seminars, and hands-on projects to explore various aspects of data science.",
    president: "Ms. Priya Singh",
    mediaLead: ["Rahul Verma", "Aarav Singh"],
    coordinator: ["Nikita Gupta", "Rohit Verma"],
    coLead: {
      web: ["Anjali Singh", "Aryan Sharma", "Sneha Verma"],
      app: ["Yash Gupta", "Riya Singh", "Rahul Sharma"],
      ai: ["Amit Verma", "Shivani Singh", "Arjun Patel"]
    },
    volunteer: ["Rohit Gupta", "Neha Singh", "Siddharth Verma", "Anjali Singh", "Harshit Tiwari"]
  }
];

export default events;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import UserDetails from '../src/models/UserDetails';
import Analytic from '../src/models/Analytic';

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb+srv://trishonbaidaya:RlWk3sEZgbQ9RqBH@cluster0.2epmryr.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    // Seed Admin User
    await UserDetails.deleteMany({});
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    const user = new UserDetails({
      websiteName: 'My Portfolio',
      hero: {
        firstName: 'Trishon',
        lastName: 'Baidaya',
        location: {
          country: 'Bangladesh',
          city: 'Chattogram',
          street: '123 Main Street',
          zipCode: '4000',
        },
        userImage: '/placeholder.svg?height=400&width=400',
        bannerImage: '/placeholder.svg?height=600&width=1200',
      },
      about: {
        skills: {
          description: 'Passionate and detail-oriented Computer Science graduate...',
          skillsList: ['Web Development', 'Software Engineering', 'UI/UX Design'],
        },
        experience: [
          {
            designation: 'Full Stack Developer',
            company: 'Freelance',
            employmentPeriod: '2022 - Present',
            description: 'Developing modern web applications...',
          },
        ],
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Chittagong',
            period: '2020 - 2024',
            description: 'Focused on software engineering...',
          },
        ],
      },
      services: [
        {
          title: 'Web Design',
          logo: '/placeholder.svg?height=64&width=64',
          subtitle: 'Modern & Responsive',
          description: 'Creating beautiful, responsive websites...',
        },
      ],
      projects: [
        {
          title: 'E-commerce Website',
          subtitle: 'Modern Shopping Platform',
          thumbnail: '/placeholder.svg?height=250&width=400',
          fullImage: '/placeholder.svg?height=500&width=800',
          liveLink: 'https://example.com',
          codeLink: 'https://github.com/example',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          category: 'single-page',
        },
      ],
      skills: {
        technologies: [
          {
            name: 'HTML5',
            logo: '/placeholder.svg?height=64&width=64',
          },
        ],
        professionalSkills: [
          {
            name: 'Communication',
            logo: '/placeholder.svg?height=64&width=64',
            level: 90,
          },
        ],
      },
      contact: {
        phone: {
          countryCode: '+880',
          number: '1817374',
        },
        email: 'trishonbaidya7399@gmail.com',
        location: {
          country: 'Bangladesh',
          city: 'Chattogram',
          street: '123 Main Street',
          zipCode: '4000',
        },
        cvLink: '/cv/trishon-baidaya-cv.pdf',
        googleMapLink: 'https://maps.google.com/maps?q=Chattogram,Bangladesh...',
      },
      socialLinks: {
        facebook: 'https://mobile.facebook.com/Trishon.Baidaya.Shontu',
        instagram: 'https://www.instagram.com/trishonbaidaya/',
        github: 'https://github.com/TrishonBaidaya7399',
        linkedin: 'https://www.linkedin.com/in/trishon-baidaya-shontu-tbs-8b20561b4/',
        twitter: 'https://twitter.com/BaidayaShontu',
        youtube: 'https://www.youtube.com/channel/UCuwiAzRSiUZMaWLpEeA_RBQ',
      },
      email: 'admin@example.com',
      password: hashedPassword,
    });
    await user.save();
    console.log('Admin user created');

    // Seed Analytics Data
    await Analytic.deleteMany({});
    const analytics = new Analytic({
      totalVisitors: 12543,
      pageViews: 45678,
      messages: 89,
      projects: 24,
      visitorGrowth: 15.3,
      messageGrowth: 8.7,
      recentActivity: [
        { action: 'New message received', time: '2 minutes ago', type: 'message' },
        { action: 'Portfolio viewed', time: '15 minutes ago', type: 'view' },
        { action: 'Project updated', time: '1 hour ago', type: 'update' },
        { action: 'New visitor from USA', time: '2 hours ago', type: 'visitor' },
      ],
      weeklyVisitors: [
        { day: 'Mon', visitors: 120 },
        { day: 'Tue', visitors: 150 },
        { day: 'Wed', visitors: 180 },
        { day: 'Thu', visitors: 140 },
        { day: 'Fri', visitors: 200 },
        { day: 'Sat', visitors: 160 },
        { day: 'Sun', visitors: 190 },
      ],
    });
    await analytics.save();
    console.log('Analytics data created');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seedDatabase();
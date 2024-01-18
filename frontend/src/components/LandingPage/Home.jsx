import React from 'react';
import { Element } from 'react-scroll';
import CustomNavbar from './Navbar';
import Section from './Section';
import CursorFollower from './CursorFollower';
import developerSvg from '../img/developer.svg';
import graphsSvg from '../img/graphs.svg';
import wavingSvg from '../img/waving.svg';
import productLaunchSvg from '../img/product-launch.svg';
import notesSvg from '../img/notes.svg';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <CustomNavbar />
      <Element name="home">
        <Section
          name="home"
          title="Embark on Your Language Learning Adventure"
          description="Embark on a transformative language learning adventure with our interactive game. Immerse yourself in a dynamic environment where each lesson is crafted to enhance your language skills while keeping you engaged and motivated. Explore a variety of exercises designed to cater to different learning styles, ensuring a personalized and effective learning experience."
          svg={developerSvg}
          alignLeft
        />
      </Element>

      <Element name="notes">
        <Section
          name="notes"
          title="Interactive Learning Notes"
          description="Revolutionize the way you take notes with our interactive learning feature. Capture key insights, jot down practice tips, and solidify new vocabulary in an engaging and visually appealing format. These notes aren't just static text – they're interactive and dynamic, making the review process not only effective but also a delight."
          svg={notesSvg}
          alignRight
        />
      </Element>

      <Element name="productlaunch">
        <Section
          name="productlaunch"
          title="Exciting Product Launch"
          description="Join us in celebrating a significant milestone – our latest product launch! We're thrilled to introduce cutting-edge features that redefine the language learning experience. From immersive simulations to real-world conversational practice, our new additions are designed to make your learning journey more engaging, effective, and enjoyable."
          svg={productLaunchSvg}
          alignLeft
        />
      </Element>

      <Element name="learnmore">
        <Section
          name="learnmore"
          title="About Our Language Learning Platform"
          description="Discover the heart and soul of our language learning platform. Dive into an ecosystem designed to nurture your curiosity and passion for languages. Uncover a rich tapestry of features, including interactive lessons, progress tracking, and a supportive community, all aimed at creating an environment where learning is not just educational but also a source of joy and accomplishment."
          svg={graphsSvg}
          alignRight
        />
      </Element>      

      <Element name="contact">
        <Section
          name="contact"
          title="Connect with Us"
          description="Your journey matters, and so does your feedback. Connect with our dedicated team to share your thoughts, ask questions, or simply say hello. We're committed to making your language learning experience exceptional, and your insights play a crucial role in shaping the future of our platform."
          svg={wavingSvg}
          alignLeft
        />
      </Element>
      <CursorFollower />
      <Footer/>
    </div>
  );
};

export default Home;

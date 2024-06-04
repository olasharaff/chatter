import ceo from '../assets/img/ceo.svg';
import group from '../assets/img/groupimage.svg'
import AboutImg from "../assets/img/about.svg"
import Group1 from "../assets/img/Group 1.svg"
import Group2 from "../assets/img/Group 2.svg"
import Group3 from "../assets/img/Group 3.svg"

const HomeNavs = [
  {
    id: 1,
    title: "Homes",
    url: "Home"
  },
  {
    id: 2,
    title: "About Us",
    url: "About"
  },
  {
    id: 3,
    title: "Contact",
    url: "Contact"
  },
  {
    id: 4,
    title: "Blogs",
    url: "/dashboard"
  }
]
const HomeSliderData1 = [
  {
    id: 1,
    image: ceo,
    content:
      `"Chatter has become an integral part of my online experience. As a user of this incredible blogging platform, I have discovered a vibrant community of individuals who are passionate about sharing their ideas and engaging in thoughtful discussions."`,
    dev: "Adebobola Muhydeen,",
    pos: "Software developer at Apple",
    btn: "John Chatter"
  }
  
];

const HomeSliderData2 = [
  {
    id: 1,
    image: group,
    title: "Write, read and connect with great minds on chatter",
    content:
      "Share people your great ideas, and also read write-ups based on your interests. connect with people of same interests and goals",
    btn: "Get started",
  }
];

const HomeAbout1 = [
  {
    id: 1,
    title: "About Chatter",
    content:
      "Chatter is a multi-functional platform where authors and readers can have access to their own content. It aims to be a traditional bookworm’s heaven and a blog to get access to more text based content. Our vision is to foster an inclusive and vibrant community where diversity is celebrated. We encourage open-mindedness and respect for all individuals, regardless of their backgrounds or beliefs. By promoting dialogue and understanding, we strive ",
      image: AboutImg
  },
];

const HomeAbout2 = [
  {
    id: 1,
    title: "Why you should join chatter",
    content:
      "Our goal is to make writers and readers see our platform as their next heaven for blogging, ensuring ease in interactions, connecting with like-minded peers, have access to favorite content based on interests and able to communicate your great ideas with people",
  },
];

const HomeAbout3 = [
  {
    id: 1,
    image: Group1,
    title: "Analytics",
    content: "Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time"
  },
  {
    id: 2,
    image: Group2,
    title: "Social interactions",
    content: "Users on the platform can interact with posts they like, comment and engage in discussions"
  },
  {
    id: 3,
    image: Group3,
    title: "Content Creation",
    content: "Write nice and appealing with our in-built markdown, a rich text editor"
  }
  
]
export { HomeNavs, HomeSliderData1, HomeSliderData2, HomeAbout1, HomeAbout2, HomeAbout3 }
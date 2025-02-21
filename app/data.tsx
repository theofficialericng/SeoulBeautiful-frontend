export const initialMessages = [{ id: 1, senderId: null, receiverId: null, content: "Hello", timestamp: new Date().toISOString() }];

export type User = {
  id: number
  username: string
  isVerified: boolean
  email: string
  age: number
  gender: string
  address: string
}

export const authors: User[] = [
  { id: 0, username: "CuriousUser", isVerified: false, email: "curious.user@gmail.com", age: 25, gender: "Male", address: "Seoul" },
  { id: 1, username: "Jane D.", isVerified: true, email: "jane.d@gmail.com", age: 30, gender: "Female", address: "New York" },
  { id: 2, username: "John S.", isVerified: true, email: "john.s@gmail.com", age: 35, gender: "Male", address: "London" },
  { id: 3, username: "BeautySeeker", isVerified: true, email: "beauty.seeker@gmail.com", age: 40, gender: "Female", address: "Paris" },
  { id: 4, username: "Kim Ji Soo", isVerified: false, email: "kim.ji.soo@gmail.com", age: 30, gender: "Female", address: "Busan" },
]

export const doctors = [
  {
    id: 1,
    name: "Dr. Kim",
    specialty: "Plastic Surgery",
    location: "Seoul",
    rating: 4.8,
    photo: "/images/dr-kim.jpg",
  },
  {
    id: 2,
    name: "Dr. Lee",
    specialty: "Dermatology",
    location: "Busan",
    rating: 4.5,
    photo: "/images/dr-lee.jpg",
  },
];

export const clinics = [
  {
    id: 1,
    name: "Seoul Beauty Clinic",
    description: "A leading clinic in Seoul specializing in facial plastic surgery.",
    image: "/images/clinic1.jpg",
    rating: 4.5,
    reviewCount: 120,
    location: "Gangnam, Seoul",
    procedures: ["Rhinoplasty", "Double Eyelid Surgery", "Facial Contouring"],
    mapUrl: "https://goo.gl/maps/exampleSeoulBeautyClinic",
    website: "https://www.seoulbeautyclinic.com",
    surgeons: [doctors[0], doctors[1]],
    reviews: [
      { id: 1, author: authors[1], rating: 5, comment: "had a temporal lift surgery and infinity threat lift application on my face two weeks ago. First of all, i would like to emphasise that Dr. Kim Sung Bae? has a different approach to his patients considering not only the esthetics surgery itself but also all the health conditions of the patient to decise which surgery could be the best and safest to the patient. My surgery went well and now i am on my healing period and i was supported fully by the doctor and his team whenever i had some questions. ? already have started to plan my face lift and eyelid surgery with him:) i would recommend Dr Kim who wants to have a holistic approach to his/her face , to hear what really could be done and what is not suitable for you and to have a trustfull doctor before and after the surgery since sustainability of the relationship is very important for an aesthetic surgery. Thank you very much" },
      { id: 2, author: authors[2], rating: 4, comment: "Very professional and knowledgeable." },
    ],
  },
  {
    id: 2,
    name: "Gangnam Plastic Surgery",
    description: "",
    image: "/images/clinic2.jpg",
    rating: 4.8,
    reviewCount: 250,
    location: "Apgujeong, Seoul",
    procedures: ["Breast Augmentation", "Liposuction", "Rhinoplasty"],
    mapUrl: "https://goo.gl/maps/exampleGangnamPlasticSurgery",
    website: "https://www.gangnamplasticsurgery.com",
    surgeons: [doctors[0], doctors[1]],
    reviews: [
      { id: 1, author: authors[1], rating: 5, comment: "had a temporal lift surgery and infinity threat lift application on my face two weeks ago. First of all, i would like to emphasise that Dr. Kim Sung Bae? has a different approach to his patients considering not only the esthetics surgery itself but also all the health conditions of the patient to decise which surgery could be the best and safest to the patient. My surgery went well and now i am on my healing period and i was supported fully by the doctor and his team whenever i had some questions. ? already have started to plan my face lift and eyelid surgery with him:) i would recommend Dr Kim who wants to have a holistic approach to his/her face , to hear what really could be done and what is not suitable for you and to have a trustfull doctor before and after the surgery since sustainability of the relationship is very important for an aesthetic surgery. Thank you very much" },
      { id: 2, author: authors[2], rating: 4, comment: "Very professional and knowledgeable." },
    ],
  },
  {
    id: 3,
    name: "K-Style Aesthetics",
    description: "",
    image: "/images/clinic3.jpg",
    rating: 4.2,
    reviewCount: 80,
    location: "Busan",
    procedures: ["Facial Contouring", "Body Contouring", "Skin Treatments"],
    mapUrl: "https://goo.gl/maps/exampleKStyleAesthetics",
    website: "https://www.k-styleaesthetics.com",
    surgeons: [doctors[0], doctors[1]],
    reviews: [
      { id: 1, author: authors[1], rating: 5, comment: "had a temporal lift surgery and infinity threat lift application on my face two weeks ago. First of all, i would like to emphasise that Dr. Kim Sung Bae? has a different approach to his patients considering not only the esthetics surgery itself but also all the health conditions of the patient to decise which surgery could be the best and safest to the patient. My surgery went well and now i am on my healing period and i was supported fully by the doctor and his team whenever i had some questions. ? already have started to plan my face lift and eyelid surgery with him:) i would recommend Dr Kim who wants to have a holistic approach to his/her face , to hear what really could be done and what is not suitable for you and to have a trustfull doctor before and after the surgery since sustainability of the relationship is very important for an aesthetic surgery. Thank you very much" },
      { id: 2, author: authors[2], rating: 4, comment: "Very professional and knowledgeable." },
    ],
  },
];

export const allClinics = [
  "Seoul Beauty Clinic",
  "Gangnam Plastic Surgery",
  "K-Style Aesthetics",
  "Miracle Plastic Surgery",
  "Dream Plastic Surgery",
];

export const procedureCategories = [
  {
    name: "Facial Procedures",
    procedures: [
      {
        name: "Rhinoplasty",
        description: "Reshape and enhance the nose for improved facial harmony.",
        image: "/images/rhinoplasty.jpg",
      },
      {
        name: "Facelift",
        description: "Reduce signs of aging and restore a more youthful appearance.",
        image: "/images/facelift.jpg",
      },
    ],
  },
  {
    name: "Body Contouring",
    procedures: [
      {
        name: "Liposuction",
        description: "Remove stubborn fat deposits for a more sculpted body shape.",
        image: "/images/liposuction.jpg",
      },
    ],
  },
];

export const initialTopics = [
  { id: 1, title: "What to expect during rhinoplasty recovery?", author: authors[0], replies: 5 },
  { id: 2, title: "Best clinics for double eyelid surgery?", author: authors[3], replies: 8 },
];

export const initialReviews = [
  {
    id: 1,
    clinic: clinics[0],
    author: authors[1],
    rating: 5,
    comment: "had a temporal lift surgery and infinity threat lift application on my face two weeks ago. First of all, i would like to emphasise that Dr. Kim Sung Bae? has a different approach to his patients considering not only the esthetics surgery itself but also all the health conditions of the patient to decise which surgery could be the best and safest to the patient. My surgery went well and now i am on my healing period and i was supported fully by the doctor and his team whenever i had some questions. ? already have started to plan my face lift and eyelid surgery with him:) i would recommend Dr Kim who wants to have a holistic approach to his/her face , to hear what really could be done and what is not suitable for you and to have a trustfull doctor before and after the surgery since sustainability of the relationship is very important for an aesthetic surgery. Thank you very much",
    images: ["/images/before-after-1.jpg"],
    procedure: "Jaw Reduction Surgery",
  },
  {
    id: 2,
    clinic: clinics[0],
    author: authors[2],
    rating: 4,
    comment: "I recently (jan 16, 2025) had my lower blepharoplasty procedure with Dr. Nam which was transconjuctival under local anesthesia. Dr. Nam also recommended a fat transfer to enhance my results, but it was not in budget and I didn't want to wait. He said I could get it done later and that is what I opted to do. I have hated my eyebags for years and finally decided to do something about it. The process from the consultation to the procedure and aftercare was so quick and easy. All of the assistants and office staff were so kind and responsive. I am only a month out and I'm healing beautifully. Allcof my bruising and swelling has been gone for about 2 weeks and I never had any pain. This was the best thing I could have done for myself and I will never let another doctor do any cosmetic procedures for me. I think my results speaks for itself and I've been raving about Dr. Nam anywhere I can leave reviews or tell people to take a chance and book a consultation. Dr. Nam is magic and I will definitely be back later for the fat transfer and any other help I need. So worth it!",
    images: ["/images/before-after-2.jpg"],
    procedure: "Double Eyelid Surgery",
  },
  {
    id: 3,
    clinic: clinics[1],
    author: authors[3],
    rating: 5,
    comment: "My face looks slacker now again and if a PS saw me he would recommend a FL. My jawline is as before (but a slight bit better, maybe not as bad). I saw my sister for the first time since my surgery last year and she never saw anything different about me. My ears stick out a lot now and needs pinning. I try to hide them with my hair. I have started using filler again, but booked for upper bleph and brow lift next month. In the hopes that the upper third will distract from general slackness.",
    images: ["/images/before-after-4.jpg"], // "/images/before-after-3.jpg", 
    procedure: "Rhinoplasty, Face Lifting",
  },
  {
    id: 4,
    clinic: clinics[2],
    author: authors[4],
    rating: 4.5,
    comment: "Doctors were professional and understanding",
    images: [],
    procedure: "Brazilian Butt Lift",
  },
]

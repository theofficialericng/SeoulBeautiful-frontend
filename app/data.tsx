export const initialMessages = [{ id: 1, senderId: null, receiverId: null, content: "Hello", timestamp: new Date().toISOString() }];

export const authors = [
  { id: 0, username: "CuriousUser", isVerified: false },
  { id: 1, username: "Jane D.", isVerified: true },
  { id: 2, username: "John S.", isVerified: true },
  { id: 3, username: "BeautySeeker", isVerified: true },
  { id: 4, username: "Kim Ji Soo", isVerified: false},
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
      { id: 1, author: authors[1], rating: 5, comment: "Excellent results and care!" },
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
      { id: 1, author: authors[1], rating: 5, comment: "Excellent results and care!" },
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
      { id: 1, author: authors[1], rating: 5, comment: "Excellent results and care!" },
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
    comment: "Excellent results and care!",
    images: ["/images/before-after-1.jpg"],
    procedure: "Jaw Reduction Surgery",
  },
  {
    id: 2,
    clinic: clinics[0],
    author: authors[2],
    rating: 4,
    comment: "Very professional staff.",
    images: ["/images/before-after-2.jpg"],
    procedure: "Double Eyelid Surgery",
  },
  {
    id: 3,
    clinic: clinics[1],
    author: authors[3],
    rating: 5,
    comment: "Amazing experience from start to finish.",
    images: ["/images/before-after-3.jpg", "/images/before-after-4.jpg"],
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

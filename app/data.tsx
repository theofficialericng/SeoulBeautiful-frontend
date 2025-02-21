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
  { id: 2, username: "Valerie S.", isVerified: true, email: "john.s@gmail.com", age: 35, gender: "Male", address: "London" },
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
      { id: 2, author: authors[2], rating: 5, comment: "It has been exactly 2 weeks after my non-incisional double eyelid procedure with Dr. Seo Yong Hoon at Seoul Beauty Clinic and I am so so happy with the results! The before photos are pics of my monolids with lashes/no lashes/my ID pic and the after photos are from the day of the surgery and today(2weeks after).I told Dr. Seo during the consultation that I wanted it to look natural with a thin crease. Dr. Seo showed me what he recommended would be natural and agreed that it would look best if I didn’t go for a high crease. He understood how I wanted it to look like and was able to execute my exact requests/look. He was very gentle, polite and honest so I felt at ease. He also told me an additional epicanthoplasty procedure is an option as well but did not push or pressure me into it which I really appreciated. I eventually did opt to get both the nonincional double eyelid procedure with the epicanthoplasty because I did have a strong Mongolian epicanthal fold (my inner eye corner skin covers alot of my inner eyelid). He reassured me it would be natural and not drastic but enough for the double eyelid to be seen better without the inner corner hiding it. He even showed me examples of past epicanthoplasty procedures he’s done when I asked and told me he will only do the procedure if I explicitly ask for it but it isn’t necessary. It’s only been two weeks but I’m already happy with how it’s looking now, I don’t think you can even notice I got the surgery- I’m surprised at how much it healed up in the span of 2 weeks. I’m excited for when it gets more settled down and fully healed. During the whole process, from consultation to surgery to kakaotalk communications throughout, the team made me feel safe and comfortable and well taken care of. Heekyung kept contact with me and was there to answer any questions I had and was always so sweet and helpful. This was my very first cosmetic proecure so I was very nervous, but I am so glad I made the choice in choosing Seoul Beauty Clinic." },
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
    comment: "It has been exactly 2 weeks after my non-incisional double eyelid procedure with Dr. Seo Yong Hoon at Seoul Beauty Clinic and I am so so happy with the results! The before photos are pics of my monolids with lashes/no lashes/my ID pic and the after photos are from the day of the surgery and today(2weeks after).I told Dr. Seo during the consultation that I wanted it to look natural with a thin crease. Dr. Seo showed me what he recommended would be natural and agreed that it would look best if I didn’t go for a high crease. He understood how I wanted it to look like and was able to execute my exact requests/look. He was very gentle, polite and honest so I felt at ease. He also told me an additional epicanthoplasty procedure is an option as well but did not push or pressure me into it which I really appreciated. I eventually did opt to get both the nonincional double eyelid procedure with the epicanthoplasty because I did have a strong Mongolian epicanthal fold (my inner eye corner skin covers alot of my inner eyelid). He reassured me it would be natural and not drastic but enough for the double eyelid to be seen better without the inner corner hiding it. He even showed me examples of past epicanthoplasty procedures he’s done when I asked and told me he will only do the procedure if I explicitly ask for it but it isn’t necessary. It’s only been two weeks but I’m already happy with how it’s looking now, I don’t think you can even notice I got the surgery- I’m surprised at how much it healed up in the span of 2 weeks. I’m excited for when it gets more settled down and fully healed. During the whole process, from consultation to surgery to kakaotalk communications throughout, the team made me feel safe and comfortable and well taken care of. Heekyung kept contact with me and was there to answer any questions I had and was always so sweet and helpful. This was my very first cosmetic proecure so I was very nervous, but I am so glad I made the choice in choosing Seoul Beauty Clinic.",
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

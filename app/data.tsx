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
      { id: 1, author: authors[1], rating: 5, comment: "I went to Dr. Kim at Seoul Beauty Clinic for a chin implant and fat graft. I also got two rounds of Co2 laser and aqua peel to get rid of permanent marks and mole removal and acne scars I've had for years. Seoul Beauty Clinic gave me the second round free of charge. I did rhinoplasty revision and canthoplasty in 2020 with Dr Kim which I was really happy with since he did a very natural job and designed it well to customize to my face. (Which is why I would also highly recommend doing surgery with Dr. Kim if you are not even Korean since he knows exactly what to do for a variety of face types. The doctor I went to before Dr. Kim just seemed to copy and paste a nose that did not work for my face) All of the english speaking staff were very kind and accomondating to me and very fluent. Lily, Kylie, Iris, Jenna and Jenny were all very kind to me during the recovery process and responded to questions quickly. I am very happy with the chin implant, recovery time was actually pretty quick. I could chew again in 5 days and most of the swelling was gone in two weeks. The fat transfer design went well, Dr. Kim eyed it really well and injected fat into areas that needed it the most but my fat survival rate was not as high as I hoped after a month. But that is just my body, and I can come in for another round and fat transfers are very hard to predict. (As alot of fat transfers take more than 1 round.) And to be fair, I was not eat too much my first week and was on a liquid diet so that could possibly have caused the rate to be lower. I cannot give a final review the co2 treatments because those take multiple sessions. My skin looks noticably brighter with less dark spots after two treatments but my scars and moles dont look too different. But once again it was only 2 treatments and typically 4-6 is needed. So I will finish them in the states or if I come back to Seoul Beauty Clinic for second round of fat transfer. Overall I am very happy with the experience and after care was great too. The staff was very friendly and I did not feel like i was being pushed in and out like it was a factory. There was several post op check ups, including oxygen chamber and facial treatments." },
      { id: 2, author: authors[2], rating: 5, comment: "It has  been exactly 2 weeks after my non-incisional double eyelid procedure with Dr. Seo Yong Hoon at Seoul Beauty Clinic and I am so so happy with the results! The before photos are pics of my monolids with lashes/no lashes/my ID pic and the after photos are from the day of the surgery and today(2weeks after).I told Dr. Seo during the consultation that I wanted it to look natural with a thin crease. Dr. Seo showed me what he recommended would be natural and agreed that it would look best if I didn’t go for a high crease. He understood how I wanted it to look like and was able to execute my exact requests/look. He was very gentle, polite and honest so I felt at ease. He also told me an additional epicanthoplasty procedure is an option as well but did not push or pressure me into it which I really appreciated. I eventually did opt to get both the nonincional double eyelid procedure with the epicanthoplasty because I did have a strong Mongolian epicanthal fold (my inner eye corner skin covers alot of my inner eyelid). He reassured me it would be natural and not drastic but enough for the double eyelid to be seen better without the inner corner hiding it. He even showed me examples of past epicanthoplasty procedures he’s done when I asked and told me he will only do the procedure if I explicitly ask for it but it isn’t necessary. It’s only been two weeks but I’m already happy with how it’s looking now, I don’t think you can even notice I got the surgery- I’m surprised at how much it healed up in the span of 2 weeks. I’m excited for when it gets more settled down and fully healed. During the whole process, from consultation to surgery to kakaotalk communications throughout, the team made me feel safe and comfortable and well taken care of. Heekyung kept contact with me and was there to answer any questions I had and was always so sweet and helpful. This was my very first cosmetic proecure so I was very nervous, but I am so glad I made the choice in choosing Seoul Beauty Clinic." },
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
      { id: 1, author: authors[1], rating: 5, comment: "I went to Dr. Kim at Seoul Beauty Clinic for a chin implant and fat graft. I also got two rounds of Co2 laser and aqua peel to get rid of permanent marks and mole removal and acne scars I've had for years. Seoul Beauty Clinic gave me the second round free of charge. I did rhinoplasty revision and canthoplasty in 2020 with Dr Kim which I was really happy with since he did a very natural job and designed it well to customize to my face. (Which is why I would also highly recommend doing surgery with Dr. Kim if you are not even Korean since he knows exactly what to do for a variety of face types. The doctor I went to before Dr. Kim just seemed to copy and paste a nose that did not work for my face) All of the english speaking staff were very kind and accomondating to me and very fluent. Lily, Kylie, Iris, Jenna and Jenny were all very kind to me during the recovery process and responded to questions quickly. I am very happy with the chin implant, recovery time was actually pretty quick. I could chew again in 5 days and most of the swelling was gone in two weeks. The fat transfer design went well, Dr. Kim eyed it really well and injected fat into areas that needed it the most but my fat survival rate was not as high as I hoped after a month. But that is just my body, and I can come in for another round and fat transfers are very hard to predict. (As alot of fat transfers take more than 1 round.) And to be fair, I was not eat too much my first week and was on a liquid diet so that could possibly have caused the rate to be lower. I cannot give a final review the co2 treatments because those take multiple sessions. My skin looks noticably brighter with less dark spots after two treatments but my scars and moles dont look too different. But once again it was only 2 treatments and typically 4-6 is needed. So I will finish them in the states or if I come back to Seoul Beauty Clinic for second round of fat transfer. Overall I am very happy with the experience and after care was great too. The staff was very friendly and I did not feel like i was being pushed in and out like it was a factory. There was several post op check ups, including oxygen chamber and facial treatments." },
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
      { id: 1, author: authors[1], rating: 5, comment: "I went to Dr. Kim at Seoul Beauty Clinic for a chin implant and fat graft. I also got two rounds of Co2 laser and aqua peel to get rid of permanent marks and mole removal and acne scars I've had for years. Seoul Beauty Clinic gave me the second round free of charge. I did rhinoplasty revision and canthoplasty in 2020 with Dr Kim which I was really happy with since he did a very natural job and designed it well to customize to my face. (Which is why I would also highly recommend doing surgery with Dr. Kim if you are not even Korean since he knows exactly what to do for a variety of face types. The doctor I went to before Dr. Kim just seemed to copy and paste a nose that did not work for my face) All of the english speaking staff were very kind and accomondating to me and very fluent. Lily, Kylie, Iris, Jenna and Jenny were all very kind to me during the recovery process and responded to questions quickly. I am very happy with the chin implant, recovery time was actually pretty quick. I could chew again in 5 days and most of the swelling was gone in two weeks. The fat transfer design went well, Dr. Kim eyed it really well and injected fat into areas that needed it the most but my fat survival rate was not as high as I hoped after a month. But that is just my body, and I can come in for another round and fat transfers are very hard to predict. (As alot of fat transfers take more than 1 round.) And to be fair, I was not eat too much my first week and was on a liquid diet so that could possibly have caused the rate to be lower. I cannot give a final review the co2 treatments because those take multiple sessions. My skin looks noticably brighter with less dark spots after two treatments but my scars and moles dont look too different. But once again it was only 2 treatments and typically 4-6 is needed. So I will finish them in the states or if I come back to Seoul Beauty Clinic for second round of fat transfer. Overall I am very happy with the experience and after care was great too. The staff was very friendly and I did not feel like i was being pushed in and out like it was a factory. There was several post op check ups, including oxygen chamber and facial treatments." },
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
    comment: "I went to Dr. Kim at Seoul Beauty Clinic for a chin implant and fat graft. I also got two rounds of Co2 laser and aqua peel to get rid of permanent marks and mole removal and acne scars I've had for years. Seoul Beauty Clinic gave me the second round free of charge. I did rhinoplasty revision and canthoplasty in 2020 with Dr Kim which I was really happy with since he did a very natural job and designed it well to customize to my face. (Which is why I would also highly recommend doing surgery with Dr. Kim if you are not even Korean since he knows exactly what to do for a variety of face types. The doctor I went to before Dr. Kim just seemed to copy and paste a nose that did not work for my face) All of the english speaking staff were very kind and accomondating to me and very fluent. Lily, Kylie, Iris, Jenna and Jenny were all very kind to me during the recovery process and responded to questions quickly. I am very happy with the chin implant, recovery time was actually pretty quick. I could chew again in 5 days and most of the swelling was gone in two weeks. The fat transfer design went well, Dr. Kim eyed it really well and injected fat into areas that needed it the most but my fat survival rate was not as high as I hoped after a month. But that is just my body, and I can come in for another round and fat transfers are very hard to predict. (As alot of fat transfers take more than 1 round.) And to be fair, I was not eat too much my first week and was on a liquid diet so that could possibly have caused the rate to be lower. I cannot give a final review the co2 treatments because those take multiple sessions. My skin looks noticably brighter with less dark spots after two treatments but my scars and moles dont look too different. But once again it was only 2 treatments and typically 4-6 is needed. So I will finish them in the states or if I come back to Seoul Beauty Clinic for second round of fat transfer. Overall I am very happy with the experience and after care was great too. The staff was very friendly and I did not feel like i was being pushed in and out like it was a factory. There was several post op check ups, including oxygen chamber and facial treatments.",
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

export type Award = { title: string; year?: string };

export type Founder = {
  name: string;
  honorific: string;
  photo: string;
  bio: string[];
  awards: Award[];
};

export const founders: Founder[] = [
  {
    name: "Anuradha Suresh",
    honorific: "Smt.",
    photo: "/founders/anuradha-suresh.png",
    bio: [
      "Shruthi Swara Laya was established by Smt. Anuradha Suresh in April 1998 in Fremont, California. She is an acclaimed Indian Classical Carnatic vocalist and eminent teacher in Bay Area. Anu is a recipient of an Apprenticeship grant by Alliance for California Traditional Arts for the year 2020 and 2024.",
      "Anu is an Internship Coordinator for Arts at Fremont Cultural Arts Council, Fremont, California and is on advisory board for Livermore Cultural Arts Council. Anu Suresh initiated Bay Area Kala Utsavam in 2023 along with Smt. Manasa Suresh. This two day festival includes competitions on Day 1 and concerts on Day 2.",
    ],
    awards: [
      { title: "Madhura Nadha Siromani by Nadhamadhuram, Chennai", year: "2025" },
      { title: "Past President recognition award from South India Fine Arts", year: "2024" },
      { title: "Parampara Rakshak title from VVS Foundation USA", year: "2024" },
      { title: "Arts Leadership Award by Alameda County Arts Commission", year: "2020" },
      { title: "Community Heroes Award from Assembly-member Kansen Chu of District 25", year: "2019" },
      { title: "Outstanding Service Award by Lotus Silicon Valley", year: "2017" },
      { title: "Professor T. R. Subramanyam Memorial Award by Cleveland Thyagaraja Festival", year: "2017" },
    ],
  },
  {
    name: "Manasa Suresh",
    honorific: "Smt.",
    photo: "/founders/manasa-suresh.png",
    bio: [
      "Manasa Suresh is a disciple of late Padma Bhushan Sri. P. S. Narayanaswamy. She received previous training from her mother, Smt. Anuradha Suresh, and was also guided by Kunnakudi Sri. M. Balamurali Krishna.",
      "Manasa has performed concerts in the US, India, UK, and Sri Lanka, in addition to providing vocal support for dance recitals and productions. She was also a graded artist at All India Radio, Chennai. Manasa currently works for Children's Health Council in Palo Alto, CA, and is also a faculty member at Shruthi Swara Laya School of Music, Fremont, CA.",
    ],
    awards: [
      { title: "P.S. Narayanaswamy Memorial Award, Bhairavi Fine Arts at Cleveland Thyagaraja Festival", year: "2026" },
      { title: "Yuva Prathibhaa Award for Youth Excellence in Music, VVS Foundation, Chennai, India", year: "2016" },
      { title: "Yuva Puraskar Award for Youth Excellence in Music, Kalalaya, San Jose", year: "2016" },
      { title: "Times Thyagaraja Award, Times of India", year: "2015" },
      { title: "Fulbright U.S. Junior Scholar Award, Fulbright Association", year: "2013" },
    ],
  },
  {
    name: "Arun Mahadevan",
    honorific: "Shri.",
    photo: "/founders/arun-mahadevan.png",
    bio: [
      "Arun Mahadevan began his training in Carnatic vocal at the age of six under the guidance of Smt. Ranganayaki Rajan in Bengaluru, followed by guidance from Smt. Lakshmi Suparna of Nadopasana School of Music, Malleswaram, Bengaluru. He later learnt from Vidwan O.S. Thiagarajan and also had the privilege of learning from the late Prof. T. R. Subramaniam. He is currently taking advanced lessons from Vidwan Delhi P. Sunderrajan.",
      "Arun has performed concerts at various venues in India and the USA, in addition to providing vocal accompaniment for several Bharatanatyam and Kuchipudi recitals. Notable performances in the US include venues such as the Cleveland Thyagaraja Aradhana, SV LOTUS, and the Bay Area Margazhi festival. Arun is a graded artist at the Bengaluru station of All India Radio.",
      "Aside from music, Arun received his PhD in bioengineering from Rice University, Houston, Texas, and currently works for a biotech startup. He has been a faculty member at the Shruti Swara Laya school of music since 2020.",
    ],
    awards: [],
  },
];

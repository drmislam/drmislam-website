export const doctor = {
  name: "Dr. M Islam",
  designation: "Senior Consultant Physician",
  speciality: "Homoeopathy",

  qualifications: [
    "BHHMS (Hons) (Cal)",
    "Asst. Prof. PCMMCH",
    "Senior Research Fellow",
    "Resident Medical Officer",
    "Ex HP of MBHMCH",
  ],

  registration: {
    number: "33027",
    council: "WBHMC",
  },

  affiliations: [
    "NIH Salt Lake Hospital",
    "MBHMCH",
    "PCMMCH Islamia Hospital",
    "The Mayfair Hospital",
  ],

  locations: [
    {
      id: "health-medical-center",
      name: "Health Medical Center",
      address: "Beldanga, Railbazar, Murshidabad",
      timings: [
        {
          day: "Saturday",
          time: "9:00 AM – 12:00 PM & 4:00 PM – 7:30 PM",
        },
        {
          day: "Sunday",
          time: "9:00 AM – 12:00 PM & 4:00 PM – 7:30 PM",
        },
      ],
    },
    {
      id: "suraksha-homeo-clinics",
      name: "Suraksha Homeo Clinics",
      address: "Panchanantala, Berhampur, Murshidabad",
      timings: [
        {
          day: "Friday",
          time: "10:00 AM – 5:00 PM",
        },
        {
          day: "Monday",
          time: "9:00 AM – 5:00 PM",
        },
      ],
    },
    {
      id: "tirupati-balaji-hospital",
      name: "Tirupati Balaji Hospital",
      alsoKnownAs: "The Mayfair Hospital",
      address: "34/1A B.T. Road, Kolkata – 700002",
      timings: [
        {
          day: "Wednesday",
          time: "10:00 AM – 2:00 PM",
        },
        {
          day: "Thursday",
          time: "10:00 AM – 2:00 PM",
        },
      ],
    },
  ],

  videoConsultation: {
    available: true,
    days: ["Friday", "Saturday", "Sunday"],
    time: "9:00 PM – 10:00 PM",
    note: "For patients who are unable to visit the chamber.",
  },
};

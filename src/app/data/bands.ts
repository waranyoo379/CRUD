import { Band } from "../types/Band"; // หรือ @/types/band ตามที่คุณตั้งไว้

export const favoriteBands: Band[] = [
  {
    id: "oasis",
    name: "Oasis",
    formationYear: 1991,
    image: "/images/oasis.jpg",
    members: [
      {
        name: "Liam Gallagher",
        role: "Lead Vocals",
        image: "/images/liam.jpg",
      },
      {
        name: "Noel Gallagher",
        role: "Lead Guitar, Vocals",
        image: "/images/noel.jpg",
      },
      {
        name: "Paul Arthurs",
        role: "Rhythm Guitar",
        image: "/images/paularthurs.jpg",
      },
      {
        name: "Paul McGuigan",
        role: "Bass",
        image: "/images/paulmcguigan.jpg",
      },
      {
        name: "Tony McCarroll",
        role: "Drums",
        image: "/images/tony.jpg",
      },
    ],
  },
  {
    id: "green-day",
    name: "Green Day",
    formationYear: 1987,
    image: "/images/greenday.jpg",
    members: [
      {
        name: "Billie Joe Armstrong",
        role: "Lead Vocals, Guitar",
        image: "/images/billiejoe.jpg",
      },
      {
        name: "Mike Dirnt",
        role: "Bass, Backing Vocals",
        image: "/images/mikedirnt.jpg",
      },
      {
        name: "Tré Cool",
        role: "Drums",
        image: "/images/trecool.jpg",
      },
    ],
  },
  {
    id: "the-beatles",
    name: "The Beatles",
    formationYear: 1960,
    image: "/images/thebeatles.jpg",
    members: [
      {
        name: "John Lennon",
        role: "Vocals, Rhythm Guitar",
        image: "/images/johnlennon.jpg",
      },
      {
        name: "Paul McCartney",
        role: "Vocals, Bass",
        image: "/images/paulmccartney.jpg",
      },
      {
        name: "George Harrison",
        role: "Lead Guitar, Vocals",
        image: "/images/georgeharrison.jpg",
      },
      {
        name: "Ringo Starr",
        role: "Drums, Vocals",
        image: "/images/ringostarr.jpg",
      },
    ],
  },
];
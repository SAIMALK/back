import { generateObjectId } from "../utils/generateObjId.js";

const PestsData = [  
  {
    _id: generateObjectId("p1"),
    img: "https://media.gettyimages.com/id/1125607687/photo/farmer-spraying-pesticide.jpg?s=612x612&w=0&k=20&c=yNWwaXRChCpEou9Vx7BH_s4hJZN7H22N2hJsjmWR7yk=",
    name: "Imidacloprid",
    type: ["Insecticide"],
    description: "Controls a broad spectrum of pests.",
    price: 15000,
    usage: 50,
    indication: "For controlling pest infestations"
  },
  {
    _id: generateObjectId("p2"),
    img: "https://media.gettyimages.com/id/1272140080/photo/pesticide-application-spray-in-plant.jpg?s=612x612&w=0&k=20&c=uXObw237suWmfRgIuSAB5sGVeoXVDtYgYA2HXYwN1_o=",
    name: "Chlorpyrifos",
    type: ["Insecticide"],
    description: "Effective against a variety of insects.",
    price: 18000,
    usage: 60,
    indication: "Used for soil and foliar application"
  },
  {
    _id: generateObjectId("p3"),
    img: "https://media.gettyimages.com/id/1290199650/photo/asian-farmer-wear-safety-clothes-with-protective-mask-spraying-organic-pesticides-on-tomato.jpg?s=612x612&w=0&k=20&c=dNgA5rwFvKBHvwcQupCYGDu0SMg-NzIOyNnEN-0ylEc=",
    name: "Lambda-Cyhalothrin",
    type: ["Insecticide"],
    description: "Protects crops from pests and diseases.",
    price: 20000,
    usage: 70,
    indication: "For controlling insect pests"
  },
  {
    _id: generateObjectId("p4"),
    img: "https://media.gettyimages.com/id/1319657586/photo/tractor-spraying-pesticide-on-wheat-field-during-sunny-day.jpg?s=612x612&w=0&k=20&c=mYfhN7--gc6fTaxjwYOEOtRkPzXJzraYIdFgBKy9Erw=",
    name: "Carbaryl",
    type: ["Insecticide"],
    description: "Effective for pest control in various crops.",
    price: 19000,
    usage: 65,
    indication: "For combating common agricultural pests"
  },
  {
    _id: generateObjectId("p5"),
    img: "https://media.gettyimages.com/id/1467344809/photo/young-farmer-sprays-his-garden-of-fresh-lettuce-cabbage-and-parsley-against-pests.jpg?s=612x612&w=0&k=20&c=TOxrSbEYeYlmxqUi9iWs0eKlYTo4L4ga8U8YnX8EjLc=",
    name: "Cypermethrin",
    type: ["Insecticide"],
    description: "Provides protection against a range of pests.",
    price: 21000,
    usage: 75,
    indication: "For managing insect infestations"
  },
  {
    _id: generateObjectId("p6"),
    img: "https://media.gettyimages.com/id/833284634/photo/crop-sprayer.jpg?s=612x612&w=0&k=20&c=vUauMNioP579mhBdvWKYUbDw1mzCle3GoU2JhTEwzk0=",
    name: "Deltamethrin",
    type: ["Insecticide"],
    description: "Targets a wide range of insects effectively.",
    price: 22000,
    usage: 80,
    indication: "For protecting crops from insect pests"
  },
  {
    _id: generateObjectId("p7"),
    img: "https://media.gettyimages.com/id/958953510/photo/agricultural-worker-takes-care-of-his-estate.jpg?s=612x612&w=0&k=20&c=asNVXLUWqkGa5DKVFo9Z3WWoTu9Hj5DCUuIPbvcpPOQ=",
    name: "Acephate",
    type: ["Insecticide"],
    description: "An effective insecticide for various crops.",
    price: 23000,
    usage: 85,
    indication: "For controlling a wide range of pests"
  },
  {
    _id: generateObjectId("p8"),
    img: "https://media.gettyimages.com/id/84423441/photo/tractor-in-field-spraying-crop.jpg?s=612x612&w=0&k=20&c=omZD0Cm79hrLIiRHBkkkbPIaCFrkGnswmnssw2zrd3k=",
    name: "Coffee Berry Borer Control",
    type: ["Insecticide"],
    description: "Specialized control for coffee berry borer.",
    price: 24000,
    usage: 90,
    indication: "For protecting coffee plants from berry borer"
  },
  {
    _id: generateObjectId("p9"),
    img: "https://media.gettyimages.com/id/157187324/photo/spraying-on-field.jpg?s=612x612&w=0&k=20&c=6ECjp4CxJsYpncv2NiPDI4S7j5YmJNBCLvpMQrSZ78w=",
    name: "Almond Moth Control",
    type: ["Insecticide"],
    description: "Controls almond moth infestations.",
    price: 25000,
    usage: 95,
    indication: "For protecting almond crops"
  },
];

export default PestsData;

import { generateObjectId } from "../utils/generateObjId.js";

const FertilizersData = [
  {
    _id: generateObjectId("f1"),
    img: "https://media.istockphoto.com/id/1372946919/photo/chemical-fertilizer.jpg?s=612x612&w=0&k=20&c=x18we3x5SKahElE76FbIoaKD-wuSCe1qRo4-8pnDNZA=",
    name: "Urea",
    type: ["Irrigation Water", "Spray"],
    description: "A common nitrogen fertilizer that helps in the vegetative growth of wheat.",
    price: 20000,
    usage: 100, 
    indication: "When a crop does not grow good",
  },
  {
    _id: generateObjectId("f2"),
    img: "https://media.istockphoto.com/id/1340516865/photo/opened-plastic-bag-with-black-granules-of-chicken-manure-on-dark-soil-background-closeup.jpg?s=612x612&w=0&k=20&c=o00BGwgUkyLeTf1i0jNfbTpw7DlBEbBOG8lF309PcFk=",
    name: "Ammonium Nitrate",
    type: ["Soil"],
    description: "Provides essential nutrients to crops and enhances their growth.",
    price: 25000,
    usage: 120,
    indication: "For enhancing soil fertility"
  },
  {
    _id: generateObjectId("f3"),
    img: "https://media.istockphoto.com/id/1319576107/photo/young-adult-woman-hands-holding-opened-plastic-bag-with-gray-complex-fertiliser-granules-on.jpg?s=612x612&w=0&k=20&c=1MJS2Zk_3OiT6X9DJySAurA3iFrsXylHSh5_NW62gqY=",
    name: "Diammonium Phosphate",
    type: ["Soil"],
    description: "Improves plant growth and increases crop yields.",
    price: 30000,
    usage: 80,
    indication: "When soil phosphorus levels are low"
  },
  {
    _id: generateObjectId("f4"),
    img: "https://media.istockphoto.com/id/1328836451/photo/opened-plastic-bag-with-green-complex-fertiliser-granules-on-dark-soil-background-closeup.jpg?s=612x612&w=0&k=20&c=igUvKeBPND1RKHx6uLMCQZAF48QU038nZbCbzJ7pBRo=",
    name: "Potassium Chloride",
    type: ["Soil"],
    description: "Enhances the quality of the crop by providing potassium.",
    price: 27000,
    usage: 90,
    indication: "For improving crop resistance to diseases"
  },
  {
    _id: generateObjectId("f5"),
    img: "https://media.istockphoto.com/id/136349695/photo/bagged-fertilizer.jpg?s=612x612&w=0&k=20&c=khUx5GLShkBiourmuORq0VXLVBAPUHqyu_IzQr0RvKw=",
    name: "Superphosphate",
    type: ["Soil"],
    description: "Used to boost phosphorus levels in the soil.",
    price: 29000,
    usage: 110,
    indication: "For promoting root development"
  },
  {
    _id: generateObjectId("f6"),
    img: "https://media.istockphoto.com/id/1175171754/photo/fertilizer-and-working-gloves-on-the-grass.jpg?s=612x612&w=0&k=20&c=J8rBNsAC3LwSG8F3UppIyHiFUS8Uc_czVVup_BhTxYM=",
    name: "Nitrogen-Phosphorus-Potassium Mix",
    type: ["Spray"],
    description: "A balanced fertilizer with essential nutrients.",
    price: 31000,
    usage: 130,
    indication: "For overall plant health and growth"
  },
  {
    _id: generateObjectId("f7"),
    img: "https://media.istockphoto.com/id/1461682590/photo/person-in-gloves-taking-pellets-of-ammonium-nitrate-from-bag-closeup-mineral-fertilizer.jpg?s=612x612&w=0&k=20&c=jMlACF_tCq5wnMNk4LPdEsErla7j2sj2r-0DdqCKGSs=",
    name: "Complete Plant Food",
    type: ["Soil"],
    description: "A comprehensive plant food with balanced nutrients.",
    price: 32000,
    usage: 140,
    indication: "For fruit and vegetable crops"
  },
];

export default FertilizersData;

import { generateObjectId } from "../utils/generateObjId.js";

const CropData = [
  {
    "name": "Wheat",
    "img": "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdoZWF0fGVufDB8fDB8fHww",
    "season": "Spring",
    "durationPeriod": "2-May -- 2-Aug",
    "durationInMonths": 3,
    "description": "Wheat is a staple grain used in bread, pasta, and pastries. It is a major crop in Pakistan, especially in Punjab.",
    "fertilizers": [generateObjectId('f1'), generateObjectId('f2')],
    "pests": [generateObjectId('p1'), generateObjectId('p2')],
    "seeds": [generateObjectId('s1'), generateObjectId('s2')],
    "avgProfit": 20000
  },
  {
    "name": "Corn",
    "img": "https://images.unsplash.com/photo-1511817354854-e361703ac368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29ybnxlbnwwfHwwfHx8MA%3D%3D",
    "season": "Spring to Summer",
    "durationPeriod": "15-Apr -- 15-Sep",
    "durationInMonths": 4,
    "description": "Corn is a major cereal crop used for food and animal feed, and is grown extensively in the Punjab and Sindh provinces.",
    "fertilizers": [generateObjectId('f2'), generateObjectId('f3')],
    "pests": [generateObjectId('p3'), generateObjectId('p4')],
    "seeds": [generateObjectId('s3'), generateObjectId('s4')],
    "avgProfit": 25000
  },
  {
    "name": "Sugarcane",
    "img": "https://images.unsplash.com/photo-1719424668314-a0def541377b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U3VnYXJjYW5lfGVufDB8fDB8fHww",
    "season": "Year-round",
    "durationPeriod": "1-June -- 31-Dec",
    "durationInMonths": 12,
    "description": "Sugarcane is a major cash crop used for producing sugar, ethanol, and other by-products. It thrives in warm climates with ample water.",
    "fertilizers": [generateObjectId('f1'), generateObjectId('f3')],
    "pests": [generateObjectId('p2'), generateObjectId('p5')],
    "seeds": [generateObjectId('s5'), generateObjectId('s6')],
    "avgProfit": 25000
  },
  {
    "name": "Barley",
    "img": "https://images.unsplash.com/photo-1415381850596-1d29bce989f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmFybGV5fGVufDB8fDB8fHww",
    "season": "Winter",
    "durationPeriod": "15-Nov -- 15-Apr",
    "durationInMonths": 5,
    "description": "Barley is a versatile cereal grain used for food, feed, and brewing. It is well-suited for cooler climates and grows quickly.",
    "fertilizers": [generateObjectId('f2'), generateObjectId('f4')],
    "pests": [generateObjectId('p6')],
    "seeds": [generateObjectId('s7'), generateObjectId('s8')],
    "avgProfit": 15000
  },
  {
    "name": "Rice",
    "img": "https://plus.unsplash.com/premium_photo-1664910307279-7f8e551e1e1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UmljZSUyMGNyb3B8ZW58MHx8MHx8fDA%3D",
    "season": "Monsoon",
    "durationPeriod": "1-June -- 30-Nov",
    "durationInMonths": 6,
    "description": "Rice is a staple food crop and widely grown in Pakistan.",
    "fertilizers": [generateObjectId('f1'), generateObjectId('f5')],
    "pests": [generateObjectId('p4'), generateObjectId('p7')],
    "seeds": [generateObjectId('s9'), generateObjectId('s10')],
    "avgProfit": 25000
  },
  {
    "name": "Sunflower",
    "img": "https://plus.unsplash.com/premium_photo-1661815009844-0533d0d98d45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fDB8fHww",
    "season": "Spring to Summer",
    "durationPeriod": "1-June -- 30-Sep",
    "durationInMonths": 5,
    "description": "Sunflower is grown primarily for its seeds, which are used for oil extraction. It requires plenty of sunlight and warm temperatures.",
    "fertilizers": [generateObjectId('f2'), generateObjectId('f6')],
    "pests": [generateObjectId('p1')],
    "seeds": [generateObjectId('s11')],
    "avgProfit": 20000
  },
  {
    "name": "Coffee",
    "img": "https://plus.unsplash.com/premium_photo-1675237625862-d982e7f44696?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fDB8fHww",
    "season": "Tropical Climate Year-round",
    "durationPeriod": "1-Apr -- 31-Dec",
    "durationInMonths": 12,
    "description": "Coffee plants produce beans used to make coffee. Requires a tropical climate and well-drained soil.",
    "fertilizers": [generateObjectId('f7')],
    "pests": [generateObjectId('p8')],
    "seeds": [generateObjectId('s12')],
    "avgProfit": 30000
  },
  {
    "name": "Almond",
    "img": "https://plus.unsplash.com/premium_photo-1669205342640-aef28ff08cd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fDB8fHww",
    "season": "Spring",
    "durationPeriod": "1-Feb -- 30-Aug",
    "durationInMonths": 5,
    "description": "Almond trees produce nuts that are used in a variety of culinary dishes and are a profitable crop in the drier regions.",
    "fertilizers": [generateObjectId('f7')],
    "pests": [generateObjectId('p9')],
    "seeds": [generateObjectId('s13')],
    "avgProfit": 35000
  },
  {
    "name": "Chili Peppers",
    "img": "https://media.istockphoto.com/id/1316992170/photo/red-chili-peppers-in-vegetable-garden.webp?b=1&s=170667a&w=0&k=20&c=sQkvLF6wW_BS2qErpGVSFNPox872A0YsXr7s9-apark=",
    "season": "Spring to Autumn",
    "durationPeriod": "1-June -- 30-Nov",
    "durationInMonths": 4,
    "description": "Chili peppers are grown for their hot and spicy fruit used in cooking and food preservation. They require warm weather and plenty of sunlight.",
    "fertilizers": [generateObjectId('f6')],
    "pests": [generateObjectId('p1')],
    "seeds": [generateObjectId('s14')],
    "avgProfit": 22000
  },
];

export default CropData;

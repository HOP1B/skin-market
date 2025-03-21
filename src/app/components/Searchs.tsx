// import { Prisma } from "@prisma/client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const Searchs = () => {
//   const [query, setQuery] = useState<string>("");
//   const [skins, setSkins] = useState<
//     Prisma.SkinListingGetPayload<{
//       include: {
//         skin: true;
//       };
//     }>[]
//   >([]);

//   useEffect(() => {
//     const fetchSkins = async () => {
//       try {
//         const res = await axios.get("/api/skin/listing");
//         setSkins(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchSkins();
//   }, []);

 

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
    
//     </div>
//   );
// };

// export default Searchs;

import { motion } from "framer-motion";

const CustomCard = ({ name, size, price, img }) => {
  return (
    <motion.div
      className="rounded-lg shadow-md overflow-hidden bg-white"
      // Framer Motion Hover Effect
      whileHover={{
        scale: 1.05, // Scale up slightly
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)", // Deeper shadow
      }}
      transition={{
        duration: 0.3, // Smooth transition time
        ease: "easeInOut", // Responsive easing
      }}
    >
      {/* Image Section */}
      <motion.img
        src={img}
        alt={name}
        className="w-full h-40 object-cover rounded-t-lg rounded-b-lg"
        whileHover={{
          brightness: 1.2, // Optional subtle brightness shift on hover
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />

      {/* Text Content */}
      <div className="p-4">
        <motion.h3
          className="font-bold text-lg"
          whileHover={{
            color: "#1a202c", // Slightly darker color on hover
          }}
          transition={{
            duration: 0.2,
          }}
        >
          {name}
        </motion.h3>
        <p className="text-gray-500">{size}</p>
        <motion.p
          className="font-bold text-xl"
          whileHover={{
            color: "#3182ce", // Subtle color shift on hover
          }}
          transition={{
            duration: 0.2,
          }}
        >
          {price}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CustomCard;

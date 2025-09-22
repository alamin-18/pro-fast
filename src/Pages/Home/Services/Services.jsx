// src/components/Services.jsx
import { FaTruck, FaGlobe, FaBoxes, FaMoneyBillWave, FaBuilding, FaUndo } from "react-icons/fa";
import ServiceCard from "./ServicesCard";

const services = [
  {
    id: 1,
    icon: <FaTruck size={36} className="text-lime-500" />,
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    id: 2,
    icon: <FaGlobe size={36} className="text-lime-500" />,
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    id: 3,
    icon: <FaBoxes size={36} className="text-lime-500" />,
    title: "Fulfillment Solution",
    desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    id: 4,
    icon: <FaMoneyBillWave size={36} className="text-lime-500" />,
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    id: 5,
    icon: <FaBuilding size={36} className="text-lime-500" />,
    title: "Corporate Service / Contract In Logistics",
    desc: "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    id: 6,
    icon: <FaUndo size={36} className="text-lime-500" />,
    title: "Parcel Return",
    desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const Services = () => {
  return (
    <section className="bg-teal-900 text-center rounded-3xl py-12 px-6">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-white mb-2">Our Services</h2>
      <p className="text-gray-200 max-w-2xl mx-auto mb-10 text-sm">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
        From personal packages to business shipments — we deliver on time, every time.
      </p>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            desc={service.desc}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;

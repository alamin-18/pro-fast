import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import agent from '../../assets/agent-pending.png'

// Import the service center data
// assuming you saved the JSON file locally
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function BecomeRider() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const serviceCenters = useLoaderData(); // Use the imported JSON data

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    // Get unique regions
    const regions = [...new Set(serviceCenters.map((item) => item.region))];

    // Get districts based on selected region
    const districts = serviceCenters
        .filter((item) => item.region === selectedRegion)
        .map((item) => item.district);

    // Get covered areas based on selected district
    const coveredAreas = serviceCenters.find(
        (item) => item.district === selectedDistrict
    )?.covered_area;

    const onSubmit = async (data) => {

        const formData = { ...data, status: 'pending', applyDate: new Date().toLocaleDateString() };
       const res= await axiosSecure.post('/riders', formData)
        if(res.data.insertedId){

            console.log(res.data);

        Swal.fire({
            title: "Form Submitted!",
            html: `
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Age:</b> ${data.age}</p>
        <p><b>NID:</b> ${data.nid}</p>
        <p><b>Region:</b> ${data.region}</p>
        <p><b>District:</b> ${data.district}</p>
        <p><b>Area:</b> ${data.area}</p>
        <p><b>Work Type:</b> ${data.work}</p>
        <p><b>Contact:</b> ${data.contact}</p>
      `,
            icon: "success",
            confirmButtonText: "OK",
        });
    }
        
        // reset();
        // setSelectedRegion("");
        // setSelectedDistrict("");
    };

    return (
        <div className="p-10 bg-white my-20 rounded-3xl">
            <h1 className="text-4xl font-bold ">Become a Rider</h1>
            <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <hr className="border-t-2  my-4" />
            <div className="flex flex-col md:flex-row justify-center p-4 min-h-screen gap-10  bg-gray-100">

                <div className="flex-1  bg-gray-100 ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow-lg rounded-2xl p-6 w-full "
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center">Tell us about yourself</h2>

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                defaultValue={user?.displayName}
                                {...register("name", { required: "Name is required" })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                defaultValue={user?.email}
                                {...register("email", { required: "Email is required" })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Age */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Age</label>
                            <input
                                type="number"
                                {...register("age", { required: "Age is required", min: 18 })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your age"
                            />
                            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                        </div>

                        {/* NID */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">NID</label>
                            <input
                                {...register("nid", { required: "NID is required" })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your NID"
                            />
                            {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
                        </div>

                        {/* Region */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Region</label>
                            <select
                                {...register("region", { required: "Region is required" })}
                                value={selectedRegion}
                                onChange={(e) => {
                                    setSelectedRegion(e.target.value);
                                    setSelectedDistrict("");
                                }}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select region</option>
                                {regions.map((region, idx) => (
                                    <option key={idx} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
                        </div>

                        {/* District */}
                        {selectedRegion && (
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">District</label>
                                <select
                                    {...register("district", { required: "District is required" })}
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select district</option>
                                    {districts.map((district, idx) => (
                                        <option key={idx} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                            </div>
                        )}

                        {/* Covered Area */}
                        {selectedDistrict && (
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Covered Area</label>
                                <select
                                    {...register("area", { required: "Area is required" })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select area</option>
                                    {coveredAreas?.map((area, idx) => (
                                        <option key={idx} value={area}>
                                            {area}
                                        </option>
                                    ))}
                                </select>
                                {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
                            </div>
                        )}

                        {/* Work Preference */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">You want to work</label>
                            <select
                                {...register("work", { required: "Work preference is required" })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select an option</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                            </select>
                            {errors.work && <p className="text-red-500 text-sm">{errors.work.message}</p>}
                        </div>

                        {/* Contact */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Contact</label>
                            <input
                                type="tel"
                                {...register("contact", {
                                    required: "Contact is required",
                                    pattern: {
                                        value: /^\d{10,15}$/,
                                        message: "Enter a valid contact number",
                                    },
                                })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your contact number"
                            />
                            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#CAEB66] text-white py-2 rounded-lg font-semibold transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="flex-1">
                    <img src={agent} alt="" />
                </div>
            </div>
        </div>
    );
}

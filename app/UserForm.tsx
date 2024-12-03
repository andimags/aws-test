"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

interface UserFormProps {
    setIsSubmitted: (value: boolean) => void;
}

export default function UserForm({ setIsSubmitted }: UserFormProps) {
    interface FormData {
        firstName: string;
        lastName: string;
        birthdate: string;
        gender: string;
        profilePicture: File | null;
    }

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        birthdate: "",
        gender: "",
        profilePicture: null
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null; // Get the first file (if any)
        setFormData({ ...formData, profilePicture: file });
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const payload = new FormData();

        if (formData.profilePicture) {
            payload.append("profile_picture", formData.profilePicture);
        }

        payload.append("first_name", formData.firstName);
        payload.append("last_name", formData.lastName);
        payload.append("birthdate", formData.birthdate);
        payload.append("gender", formData.gender);

        // console.log("Payload entries:");
        // for (const [key, value] of payload.entries()) {
        //     console.log(key, value);
        // }

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:5000/users",
            data: payload
        };

        axios
            .request(config)
            .then((response) => {
                console.log(response);
                setIsSubmitted(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form action="" method="POST" onSubmit={onSubmit}>
            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                            htmlFor="first-name"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="first-name"
                            placeholder="First Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value
                                })
                            }
                        />
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                            htmlFor="last-name"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="last-name"
                            placeholder="Last Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3">
                    <div className="mb-5">
                        <label
                            htmlFor="birthdate"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Birthdate
                        </label>
                        <input
                            type="date"
                            name="birthdate"
                            id="birthdate"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.birthdate}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    birthdate: e.target.value
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Gender
                </label>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            className="h-5 w-5"
                            value="male" // Set value to 'male'
                            checked={formData.gender === "male"} // Check if the selected gender matches 'male'
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    gender: e.target.value // Update the gender to the selected value
                                })
                            }
                        />
                        <label
                            htmlFor="male"
                            className="pl-3 text-base font-medium text-[#07074D]"
                        >
                            Male
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            className="h-5 w-5"
                            value="female" // Set value to 'female'
                            checked={formData.gender === "female"} // Check if the selected gender matches 'female'
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    gender: e.target.value // Update the gender to the selected value
                                })
                            }
                        />
                        <label
                            htmlFor="female"
                            className="pl-3 text-base font-medium text-[#07074D]"
                        >
                            Female
                        </label>
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <label
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    htmlFor="profile-picture"
                >
                    Profile Picture
                </label>
                <input
                    type="file"
                    id="profile-picture"
                    onChange={handleFileChange}
                />
            </div>

            <div>
                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Submit
                </button>
            </div>
        </form>
    );
}

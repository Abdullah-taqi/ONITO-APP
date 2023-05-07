import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./style.css"

const Register = () => {

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState('');
    const [idValue, setIdValue] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setIdValue('');
    };

    const handleIdChange = (event) => {
        setIdValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', selectedOption, idValue);
    };

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        emergency: "",
        desc: "",
        sex : "",
        govTitle: "",
        govId: "",
        gaurdTitle: "",
        gaurdName: "",
        address: "",
        state: "",
        city: "",
        country: "",
        pincode: "",
        occupation: "",
        religion: "",
        maritalStatus: "",
        bloogGroup: "",
        nationality: ""

    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addinputdata = async (e) => {
        e.preventDefault();

        const { name, email, emergency, address, mobile, desc, age, sex, govId, govTitle, gaurdId, gaurdName, state, city, country, pincode, occupation, religion, maritalStatus, bloodGroup, nationality } = inpval;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, emergency, mobile, desc, age, sex, govId, govTitle, gaurdId, gaurdName, address, state, city, country, pincode, occupation, religion, maritalStatus, bloodGroup, nationality
            })
        })

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("Error");
            console.log("Error");
        } else {
            alert("Data added");
            console.log("Data added");
            navigate("/");
        }
    }

    return (
        <div className='container'>
            <form>
                <div>

                    {/*  Personal-details */}
                    <div className='mt-5'>
                        <hr />
                    </div>
                    <h5 className='text-decoration-underline mb-4'>Personal Details</h5>
                    <div className="personal-details row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" placeholder='Enter Name' value={inpval.name} onChange={setdata} name="name" className="form-control" id="name" aria-describedby="nameHelp" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="age" className="form-label">DOB</label>
                            <input type="number" placeholder="12-01-2000" value={inpval.age} onChange={setdata} name="age" className="form-control" id="age" aria-describedby="ageHelp" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="sex" className="form-label">SEX</label>
                            <select id="sex" className="form-select" onChange={setdata} value={inpval.sex}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="mobile" className="form-label">Mobile</label>
                            <input type="number" placeholder='Enter Mobile No.' value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="mobile" aria-describedby="mobileHelp" />
                        </div>
                        <div className="col-md-8 mb-3 mt-2">
                            <div className="form-group">
                                <label htmlFor="govt-id">Govt ID:</label>
                                <select id="govt-id" value={inpval.govTitle} onChange={setdata} className="form-select">
                                    <option value="">Select ID Type</option>
                                    <option value="pancard">Pancard</option>
                                    <option value="aadhaar">Aadhaar Card</option>
                                </select>
                            </div>
                        </div>
                        {selectedOption === "pancard" && (
                            <div className="col-md-6 mb-3">
                                <label htmlFor="pancard">Pancard ID:</label>
                                <input
                                    id="pancard"
                                    type="text"
                                    value={inpval.govId}
                                    onChange={setdata}
                                    pattern="[A-Za-z0-9]{10}"
                                    maxLength={10}
                                    minLength={10}
                                    required
                                    className="form-control"
                                    style={{ borderColor: idValue.length !== 12 ? "red" : "initial" }}
                                />
                            </div>
                        )}
                        {selectedOption === "aadhaar" && (
                            <div className="col-md-6 mb-3">
                                <label htmlFor="aadhaar">Aadhaar Card ID:</label>
                                <input
                                    id="aadhaar"
                                    type="text"
                                    value={inpval.govId}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value.length <= 12 && regex.test(value)) {
                                            handleIdChange(e);
                                        }
                                    }}
                                    maxLength={12}
                                    pattern="[0-9]{12}"
                                    required
                                    className="form-control"
                                    style={{ borderColor: idValue.length !== 12 ? "red" : "initial" }}
                                />
                            </div>
                        )}
                    </div>
                    <div className='mt-5'>
                        <hr />
                    </div>

                    {/* Contact details */}

                    <h5 className='text-decoration-underline mb-4'>Contact Details</h5>
                    <div class="contact-details row">
                        <div class="col-sm-4 mb-3">
                            <label for="guardianDetails" class="form-label">Guardian Details:</label>
                            <div class="d-flex align-items-center">
                                <select id="guardianTitle" name="guardianTitle" class="form-select me-2" onChange={setdata} value={inpval.gaurdTitle}>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                </select>
                                <input type="text" id="guardianName" name="guardianName" placeholder="Enter Guardian Name" required class="form-control" onChange={setdata} value={inpval.gaurdName}/>
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input type="email" placeholder='Enter Email ID' value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="exampleInputEmail1" class="form-label">Emergency Contact Number</label>
                            <input type="number" placeholder='Enter Emergency Contact No.' value={inpval.emergency} onChange={setdata} name="emergency" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <hr />
                    </div>

                    {/* Address Details */}

                    <h5 className='text-decoration-underline mb-4'>Address Details</h5>
                    <div className="address-details">
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                            <input type="text" placeholder='Enter Address' value={inpval.address} onChange={setdata} name='address' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="state" className="form-label">State:</label>
                                <select className="form-select" id="state" required onChange={setdata} value={inpval.state}>
                                    <option value="">Select a state</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="city" className="form-label">City:</label>
                                <input type="text" placeholder='Enter City Name' className="form-control" id="city" required onChange={setdata} value={inpval.city} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="country" className="form-label">Country:</label>
                                <input type="text" placeholder='Country Name' className="form-control" id="country" required onChange={setdata} value={inpval.country}/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="pincode" className="form-label">Pincode:</label>
                                <input type="number" placeholder='Enter Pincode' className="form-control" id="pincode" pattern="[0-9]{6}" required onChange={setdata} value={inpval.pincode}/>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <hr />
                    </div>


                    {/*  Other details */}

                    <h5 className='text-decoration-underline mb-4'>Other Details</h5>
                    <div className="other-details row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="occupation" className="form-label">Occupation:</label>
                                <input
                                    id="occupation"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Occupation"
                                    onChange={setdata}
                                    value={inpval.occupation}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="religion" className="form-label">Religion:</label>
                                <select
                                    id="religion"
                                    className="form-select"
                                    onChange={setdata}
                                    value={inpval.religion}
                                >
                                    <option value="">Select Religion</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Islam">Islam</option>
                                    <option value="Christian">Christian</option>
                                    <option value="Sikh">Sikh</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="maritalStatus" className="form-label">Marital Status:</label>
                                <select
                                    id="maritalStatus"
                                    className="form-select"
                                    onChange={setdata}
                                    value={inpval.maritalStatus}
                                >
                                    <option value="">Select Marital Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="bloodGroup" className="form-label">Blood Group:</label>
                                <select
                                    id="bloodGroup"
                                    className="form-select"
                                    onChange={setdata}
                                    value={inpval.bloodGroup}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="nationality" className="form-label">Nationality:</label>
                                <input
                                    id="nationality"
                                    type="text"
                                    className="form-control"
                                    placeholder='Enter Nationality'
                                    onChange={setdata}
                                    value={inpval.nationality}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" onClick={addinputdata} class=" my-3 btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register

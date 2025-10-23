import React, {useState} from "react";


export default function User({userData, setUserData}) {
    const [formData, setFormData] = useState({
        username: userData.name || "",
        password: userData.password || "",
        email: userData.email || "",
    })

    const [amount, setAmount] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({prev, [name]: value}));
    }

    const handleSave = (e) => {
        e.preventDefault();
        setUserData((prev) => ({ ...prev, ...formData }));
        alert("Your profile has been updated!");
    };

    const handleAddMoney = (e) => {
        e.preventDefault();
        const added = parseFloat(amount);
        if (!isNaN(added) && added > 0) {
            setUserData((prev) => ({ ...prev, balance: prev.balance + added }));
            setAmount("");
        } else {
            alert("Enter a valid amount.");
        }
    };

    return (
        <div className="user-page">
            <h2>Your Account</h2>

            <div className="balance-box">
                <h3>Current Balance:</h3>
                <p>${userData.balance.toFixed(2)}</p>
            </div>

            <form onSubmit={handleAddMoney} className="add-money-form">
                <input
                    type="number"
                    placeholder="Amount to add"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit">Add Money</button>
            </form>

            <hr />

            <h3>Update Your Info</h3>
            <form onSubmit={handleSave} className="user-form">
                <input
                    name="name"
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="New password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Save Changes</button>
            </form>

        </div>
    )


}
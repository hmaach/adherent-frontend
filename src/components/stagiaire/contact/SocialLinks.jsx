import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import './contact.css'

const SocialAccounts = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, platform: "Facebook", link: "https://www.facebook.com" },
    { id: 2, platform: "Twitter", link: "https://www.twitter.com" },
    { id: 3, platform: "Instagram", link: "https://www.instagram.com" },
    { id: 4, platform: "LinkedIn", link: "https://www.linkedin.com" },
  ]);

  const [newAccount, setNewAccount] = useState({ platform: "", link: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    const id = accounts.length + 1;
    setAccounts([...accounts, { ...newAccount, id }]);
    setNewAccount({ platform: "", link: "" });
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const handleEditAccount = (id, updatedAccount) => {
    setAccounts(
      accounts.map((account) => (account.id === id ? updatedAccount : account))
    );
  };

  return (
    <div className="social-accounts">
      <div className="accounts-list">
        {accounts.map((account) => (
          <div className="account" key={account.id}>
            {account.platform === "Facebook" && <FaFacebookF />}
            {account.platform === "Twitter" && <FaTwitter />}
            {account.platform === "Instagram" && <FaInstagram />}
            {account.platform === "LinkedIn" && <FaLinkedin />}
            <a href={account.link} target="_blank" rel="noopener noreferrer">
              {account.link}
            </a>
            <div className="actions">
              <button onClick={() => handleDeleteAccount(account.id)}>
                Delete
              </button>
              <button
                onClick={() =>
                  handleEditAccount(account.id, {
                    ...account,
                    link: `${account.link}/edit`,
                  })
                }
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <form onSubmit={handleAddAccount}>
        <input
          type="text"
          name="platform"
          placeholder="Platform"
          value={newAccount.platform}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="link"
          placeholder="Link"
          value={newAccount.link}
          onChange={handleInputChange}
        />
        <button type="submit">Add Account</button>
      </form> */}
    </div>
  );
};

export default SocialAccounts;

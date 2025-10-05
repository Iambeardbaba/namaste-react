import React from "react";

const Contact = () => {
  return (
    <div className="text-center pt-8">
      <h1 className="font-bold text-3xl">Contact Us Page</h1>
      <form>
        <input
          type="text"
          className="border border-black p-2 m-2"
          placeholder="Name"
        ></input>
        <input
          type="text"
          className="border border-black p-2 m-2"
          placeholder="Message"
        ></input>
        <button className="border border-gray-400 bg-slate-200 text-black p-2 m-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

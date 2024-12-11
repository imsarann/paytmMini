import React, { useState } from "react";
function Users() {
  return (
    <div>
      <div className="font-bold text-lg mt-6">Users</div>
      <input
        type="text"
        className="border w-full px-2 py-1 rounded border-slate-200"
        placeholder="Search users..."
      />
      <div className="flex justify-between">
        <div className="flex m-3">
          <div className="bg-slate-300 text-lg px-2.5 rounded-full">S</div>
          <div className="mt-1 ml-4">Saran P</div>
        </div>
        <div>
        <button className="bg-black text-white font-medium rounded-lg px-2 py-1 mt-2">
          Send Money
        </button>
        </div>
      </div>
    </div>
  );
}

export default Users;

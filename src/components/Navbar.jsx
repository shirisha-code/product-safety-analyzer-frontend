import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <Link to="/">
        <h1 className="text-2xl font-bold">
          🛡 Product Safety Analyzer
        </h1>
      </Link>

      <div className="flex gap-6">

        <Link
          to="/"
          className="hover:text-blue-400 transition"
        >
          Home
        </Link>

        <Link
          to="/compare"
          className="hover:text-blue-400 transition"
        >
          Compare Products
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
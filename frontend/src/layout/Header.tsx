export const Header = () => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search Input */}
      <div className="relative w-72 hidden md:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm mọi thứ..."
          className="w-full pl-10 pr-4 py-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Title for Small Screen / Mobile */}
      <div className="md:hidden font-semibold text-slate-800 text-lg">
        LaTiuKy Restaurant
      </div>

      {/* Right Navigation Controls */}
      <div className="flex items-center space-x-4">
        {/* Notifications Icon Button */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full focus:outline-none transition-colors duration-200">
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-slate-200"></div>

        {/* Profile Card */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=120&h=120"
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-50/50 group-hover:ring-indigo-100 transition-all duration-200"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">
              Admin Chef
            </p>
            <p className="text-xs text-slate-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
};

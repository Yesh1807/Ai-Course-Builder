import { BookOpen, Bell, User } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BookOpen size={19} />
          </div>

          <span className="text-lg font-bold tracking-tight text-slate-900">
            CourseAI
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-indigo-600">
            My Courses
          </a>

          <a
            href="#"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            Explore
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-900">
            <Bell size={19} />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import { ArrowRight, Clock3, Plus, Flame } from "lucide-react";

import Navbar from "../components/NavBar";
import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";

const courses = [
  {
    title: "Java Programming",
    description: "Learn Java from fundamentals to object-oriented programming.",
    progress: 78,
    completedLessons: 18,
    totalLessons: 23,
  },
  {
    title: "C++ Pointers",
    description:
      "Understand pointers, memory, references, and pointer arithmetic.",
    progress: 42,
    completedLessons: 7,
    totalLessons: 17,
  },
  {
    title: "SQL Fundamentals",
    description: "Master queries, joins, filtering, grouping, and subqueries.",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome */}
        <section>
          <p className="text-sm font-medium text-indigo-600">Welcome back 👋</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Continue your learning journey
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Pick up where you left off or create a new personalized course with
            AI.
          </p>
        </section>

        {/* Continue Learning */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Continue Learning
            </h2>

            <button className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View course
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                  J
                </div>

                <div>
                  <p className="text-sm font-medium text-indigo-600">
                    Java Programming
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-slate-900">
                    Exception Handling
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Lesson 19 of 23 · Intermediate
                  </p>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                Continue Learning
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-6 max-w-xl">
              <ProgressBar progress={78} />
            </div>
          </div>
        </section>

        {/* My Courses */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                My Courses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your personalized learning paths
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-600">
              <Plus size={16} />
              Create Course
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>
        </section>

        {/* Learning Stats */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Your Learning Activity
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Clock3 size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Learning time</p>

                  <p className="mt-0.5 text-xl font-semibold text-slate-900">
                    4h 32m
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Flame size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Current streak</p>

                  <p className="mt-0.5 text-xl font-semibold text-slate-900">
                    7 days
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-xs text-slate-500">Courses completed</p>

                <p className="mt-0.5 text-xl font-semibold text-slate-900">3</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

import { ArrowRight, BookOpen } from "lucide-react";
import ProgressBar from "./ProgressBar";

function CourseCard({ course }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      {/* Course Icon */}
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <BookOpen size={21} />
      </div>

      {/* Course Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>

        <p className="mt-1 text-sm text-slate-500">{course.description}</p>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <ProgressBar progress={course.progress} />
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {course.completedLessons} / {course.totalLessons} lessons
        </span>

        <button className="flex items-center gap-1 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700">
          Continue
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}

export default CourseCard;

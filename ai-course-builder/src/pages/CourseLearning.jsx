import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, Circle } from "lucide-react";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CourseLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true);
        const response = await api.get(`/courses/${courseId}`);
        const data = response.data.course;

        setCourse(data);

        const firstLesson = data.modules.flatMap((module) => module.lessons)[0];

        setActiveLesson(firstLesson || null);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load this course.");
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId]);

  if (loading) {
    return <main className="p-8 text-slate-500">Loading course...</main>;
  }

  if (error || !course) {
    return (
      <main className="p-8">
        <p className="mb-4 text-red-600">{error || "Course not found."}</p>
        <button
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:underline"
        >
          Back to dashboard
        </button>
      </main>
    );
  }

  const allLessons = course.modules.flatMap((module) => module.lessons);
  const progress = allLessons.length
    ? Math.round((completed.length / allLessons.length) * 100)
    : 0;

  const content = activeLesson?.content;
  const article =
    typeof content === "string"
      ? content
      : content?.article || content?.content || "No lesson content available.";

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <aside
        className="w-full shrink-0 border-r border-slate-200
        bg-white p-5 md:min-h-screen md:w-80"
      >
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-500
            hover:text-indigo-600"
        >
          <ArrowLeft size={17} /> My Courses
        </button>

        <div className="mb-5 flex items-center gap-3">
          <BookOpen className="text-indigo-600" size={25} />
          <h1 className="font-bold text-slate-900">{course.title}</h1>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>Course progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {course.modules.map((module) => (
          <section key={module.id} className="mb-5">
            <h2 className="mb-2 text-sm font-semibold text-slate-800">
              {module.position}. {module.title}
            </h2>

            <div className="space-y-1">
              {module.lessons.map((lesson) => {
                const isDone = completed.includes(lesson.id);
                const isActive = activeLesson?.id === lesson.id;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`flex w-full items-start gap-2 rounded-lg
                      px-3 py-2 text-left text-sm ${
                        isActive
                          ? "bg-indigo-50 font-medium text-indigo-700"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    {isDone ? (
                      <CheckCircle size={16} className="mt-0.5 shrink-0" />
                    ) : (
                      <Circle size={16} className="mt-0.5 shrink-0" />
                    )}
                    <span>{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 md:px-12">
        {activeLesson ? (
          <article className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium text-indigo-600">
              {course.topic} · {activeLesson.duration_minutes} min
            </p>

            <h1 className="mb-6 text-3xl font-bold text-slate-900">
              {activeLesson.title}
            </h1>

            <div className="lesson-article">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article}
              </ReactMarkdown>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6">
              <button
                onClick={() => {
                  setCompleted((previous) =>
                    previous.includes(activeLesson.id)
                      ? previous
                      : [...previous, activeLesson.id],
                  );
                }}
                disabled={completed.includes(activeLesson.id)}
                className="rounded-xl bg-indigo-600 px-5 py-3
                  font-semibold text-white hover:bg-indigo-700
                  disabled:bg-emerald-600"
              >
                {completed.includes(activeLesson.id)
                  ? "Lesson completed"
                  : "Mark as completed"}
              </button>
            </div>
          </article>
        ) : (
          <p className="text-slate-500">
            This course doesn't contain any lessons yet.
          </p>
        )}
      </main>
    </div>
  );
}

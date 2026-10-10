import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Plus, LoaderCircle } from "lucide-react";
import api from "../services/api";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [learningGoal, setLearningGoal] = useState("general");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function fetchCourses() {
    try {
      setLoading(true);
      const response = await api.get("/courses");
      setCourses(response.data.courses);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load courses. Please log in and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function handleCreateCourse(event) {
    event.preventDefault();

    if (!topic.trim()) {
      setError("Enter a topic to create your course.");
      return;
    }

    try {
      setGenerating(true);
      setError("");

      const response = await api.post("/courses", {
        topic: topic.trim(),
        difficulty,
        learning_goal: learningGoal,
      });

      setTopic("");
      await fetchCourses();
      navigate(`/learn/${response.data.course.id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Course generation failed. Please try again.",
      );
    } finally {
      setGenerating(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold text-indigo-600">
            YOUR LEARNING SPACE
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">My Courses</h1>
          <p className="mt-2 text-slate-500">
            Turn any topic into a structured learning experience.
          </p>
        </header>

        <section
          className="mb-10 rounded-2xl border border-indigo-100
          bg-white p-6 shadow-sm"
        >
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Plus size={21} className="text-indigo-600" />
            Create a new course
          </h2>

          <form
            onSubmit={handleCreateCourse}
            className="grid gap-4 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <label
                htmlFor="topic"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                What do you want to learn?
              </label>
              <input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Java OOP, pointers in C++, SQL joins"
                maxLength={200}
                required
                className="w-full rounded-xl border border-slate-300
                  px-4 py-3 outline-none focus:border-indigo-500
                  focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="difficulty"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-xl border border-slate-300
                  bg-white px-4 py-3"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="goal"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Learning goal
              </label>
              <select
                id="goal"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full rounded-xl border border-slate-300
                  bg-white px-4 py-3"
              >
                <option value="general">General learning</option>
                <option value="interview preparation">
                  Interview preparation
                </option>
                <option value="academic">Academic study</option>
                <option value="practical projects">Practical projects</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={generating}
                className="flex items-center justify-center gap-2
                  rounded-xl bg-indigo-600 px-6 py-3 font-semibold
                  text-white transition hover:bg-indigo-700
                  disabled:cursor-not-allowed disabled:opacity-60"
              >
                {generating ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Generating course...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Generate course with AI
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <section>
          <h2 className="mb-5 text-xl font-bold text-slate-900">
            Continue learning
          </h2>

          {loading ? (
            <p className="text-slate-500">Loading your courses...</p>
          ) : courses.length === 0 ? (
            <div
              className="rounded-2xl border border-dashed
              border-slate-300 bg-white p-10 text-center"
            >
              <BookOpen className="mx-auto mb-3 text-indigo-500" size={32} />
              <p className="font-semibold text-slate-800">No courses yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Create your first AI-powered course above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => navigate(`/learn/${course.id}`)}
                  className="rounded-2xl border border-slate-200
                    bg-white p-5 text-left shadow-sm transition
                    hover:-translate-y-1 hover:border-indigo-200
                    hover:shadow-md"
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center
                    justify-center rounded-xl bg-indigo-50 text-indigo-600"
                  >
                    <BookOpen size={22} />
                  </div>
                  <h3 className="font-semibold text-slate-900">
                    {course.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {course.description || course.topic}
                  </p>
                  <div
                    className="mt-4 flex items-center justify-between
                    text-xs text-slate-500"
                  >
                    <span className="capitalize">{course.difficulty}</span>
                    <span>{course.total_lessons} lessons</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

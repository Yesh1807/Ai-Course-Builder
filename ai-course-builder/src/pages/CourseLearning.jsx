import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { sampleCourse } from "../data/sampleCourse";
import CourseSidebar from "../components/CourseSideBar";
import LessonContent from "../components/LessonContent";

function getAllLessons(course) {
  return course.modules.flatMap((module) => module.lessons);
}

export default function CourseLearning() {
  const course = sampleCourse;
  const allLessons = useMemo(() => getAllLessons(course), [course]);

  const [activeLessonId, setActiveLessonId] = useState(allLessons[0]?.id);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);

  const activeIndex = allLessons.findIndex(
    (lesson) => lesson.id === activeLessonId,
  );

  const lesson = allLessons[activeIndex];
  const previousLesson = allLessons[activeIndex - 1] ?? null;
  const nextLesson = allLessons[activeIndex + 1] ?? null;

  const progress = allLessons.length
    ? Math.round((completedLessonIds.length / allLessons.length) * 100)
    : 0;

  function markComplete() {
    setCompletedLessonIds((previous) =>
      previous.includes(activeLessonId)
        ? previous
        : [...previous, activeLessonId],
    );
  }

  function handleNavigate(lessonId) {
    setActiveLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAskTutor() {
    window.alert("AI Tutor will be connected when we implement the backend.");
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BookOpen size={19} />
          </div>

          <span className="font-semibold text-slate-900">CourseAI</span>
        </div>

        <span className="hidden text-sm text-slate-500 sm:block">
          {course.title}
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        <CourseSidebar
          course={course}
          activeLessonId={activeLessonId}
          completedLessonIds={completedLessonIds}
          onSelectLesson={handleNavigate}
          progress={progress}
        />

        <main className="min-w-0 flex-1 overflow-y-auto">
          {lesson ? (
            <LessonContent
              lesson={lesson}
              previousLesson={previousLesson}
              nextLesson={nextLesson}
              isCompleted={completedLessonIds.includes(activeLessonId)}
              onComplete={markComplete}
              onNavigate={handleNavigate}
              onAskTutor={handleAskTutor}
            />
          ) : (
            <p className="p-8 text-slate-500">No lessons available.</p>
          )}
        </main>
      </div>
    </div>
  );
}

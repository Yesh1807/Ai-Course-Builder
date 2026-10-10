import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function CourseSidebar({
  course,
  activeLessonId,
  completedLessonIds,
  onSelectLesson,
  progress,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedModules, setExpandedModules] = useState(() =>
    Object.fromEntries(
      course.modules.map((module, index) => [module.id, index === 0]),
    ),
  );

  function toggleModule(moduleId) {
    setExpandedModules((previous) => ({
      ...previous,
      [moduleId]: !previous[moduleId],
    }));
  }

  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-slate-200 bg-white transition-all ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-4">
        {!collapsed && (
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <BookOpen size={21} />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-slate-900">
                {course.title}
              </h2>
              <p className="text-xs text-slate-500">Learning Path</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-slate-500">Course progress</span>
              <span className="font-semibold text-indigo-600">{progress}%</span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {course.modules.map((module, index) => {
              const isExpanded = !!expandedModules[module.id];
              const completedInModule = module.lessons.filter((lesson) =>
                completedLessonIds.includes(lesson.id),
              ).length;

              return (
                <section key={module.id} className="mb-2">
                  <button
                    onClick={() => toggleModule(module.id)}
                    aria-expanded={isExpanded}
                    className="flex w-full items-start gap-2 rounded-lg px-2 py-3 text-left hover:bg-slate-50"
                  >
                    <span className="mt-0.5 text-slate-400">
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-slate-800">
                        {module.title}
                      </span>
                      <span className="mt-1 inline-block rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                        {module.lessons.length} articles
                      </span>
                    </span>

                    <span className="pt-1 text-xs text-slate-400">
                      {completedInModule}/{module.lessons.length}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="ml-3 border-l border-slate-200 py-1 pl-2">
                      {module.lessons.map((lesson) => {
                        const active = lesson.id === activeLessonId;
                        const completed = completedLessonIds.includes(
                          lesson.id,
                        );

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onSelectLesson(lesson.id)}
                            className={`mb-1 flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                              active
                                ? "bg-indigo-50 font-medium text-indigo-700"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <span className="mt-0.5 shrink-0">
                              {completed ? (
                                <CheckCircle2
                                  size={16}
                                  className="text-emerald-600"
                                />
                              ) : active ? (
                                <Circle
                                  size={16}
                                  className="fill-indigo-600 text-indigo-600"
                                />
                              ) : (
                                <Circle size={16} className="text-slate-300" />
                              )}
                            </span>
                            <span className="min-w-0 flex-1 leading-5">
                              {lesson.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
            {completedLessonIds.length} of {totalLessons} lessons completed
          </div>
        </>
      )}
    </aside>
  );
}

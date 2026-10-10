import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function LessonContent({
  lesson,
  previousLesson,
  nextLesson,
  isCompleted,
  onComplete,
  onNavigate,
  onAskTutor,
}) {
  const content = lesson.content;

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-slate-500">
          Java Programming / Learning Path
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock3 size={14} />
          {lesson.duration}
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {lesson.title}
      </h1>

      <div className="mt-6 h-px bg-slate-200" />

      <p className="mt-8 text-base leading-8 text-slate-700 sm:text-lg">
        {content.introduction}
      </p>

      {content.sections.map((section, index) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">
            {section.heading}
          </h2>

          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-base leading-8 text-slate-700"
            >
              {paragraph}
            </p>
          ))}

          {section.bullets?.length > 0 && (
            <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-7 text-slate-700">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {content.example && (
        <section className="mt-10 overflow-hidden rounded-xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
            <h2 className="text-sm font-semibold text-slate-800">
              {content.example.title}
            </h2>
            <span className="rounded-md bg-white px-2 py-1 text-xs text-slate-500 ring-1 ring-slate-200">
              Java
            </span>
          </div>

          <pre className="overflow-x-auto bg-slate-950 p-5 text-sm leading-7 text-slate-100">
            <code>{content.example.code}</code>
          </pre>

          <div className="border-t border-slate-200 bg-white px-5 py-4">
            <p className="text-sm leading-6 text-slate-600">
              <span className="font-semibold text-slate-900">
                Explanation:{" "}
              </span>
              {content.example.explanation}
            </p>
          </div>
        </section>
      )}

      <section className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
        <div className="flex items-center gap-2">
          <Lightbulb size={19} className="text-indigo-600" />
          <h2 className="font-semibold text-slate-900">Key takeaway</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-700">
          {content.keyTakeaway}
        </p>
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={onAskTutor}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
        >
          <MessageCircle size={16} />
          Ask AI Tutor
        </button>

        <button
          onClick={onAskTutor}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
        >
          <Sparkles size={16} />
          Explain differently
        </button>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
        <button
          disabled={!previousLesson}
          onClick={() => onNavigate(previousLesson.id)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        <button
          onClick={onComplete}
          disabled={isCompleted}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 disabled:cursor-default"
        >
          <CheckCircle2 size={16} />
          {isCompleted ? "Completed" : "Mark as complete"}
        </button>

        <button
          disabled={!nextLesson}
          onClick={() => onNavigate(nextLesson.id)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next lesson
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

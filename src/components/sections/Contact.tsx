export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 py-32 border-t border-neutral-100"
    >
      <div className="max-w-xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 mb-4">
          Let's work together
        </h2>
        <p className="text-neutral-500 text-sm leading-relaxed mb-10">
          I'm currently open to new opportunities. Whether it's a full-time role,
          freelance project, or just a conversation — feel free to reach out.
        </p>

        <a
          href="mailto:your@email.com"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-neutral-700 transition-colors"
        >
          Say hello
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 7h12M7 1l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <div className="flex items-center gap-6 mt-10">
          <a
            href="https://linkedin.com/in/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://dribbble.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Dribbble
          </a>
          <a
            href="https://behance.net/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Behance
          </a>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Star, GitFork, ArrowUpRight, AlertCircle } from "lucide-react";
import { GithubIcon } from "../ui/BrandIcons.jsx";
import SectionWrapper from "../layout/SectionWrapper.jsx";
import { useGitHubProfile, useGitHubRepos } from "../../hooks/useGitHub.js";
import { githubUsername, personal } from "../../data/portfolio.js";

const LANG_COLORS = {
  Python: "#3776AB",
  Rust: "#F97316",
  Go: "#00ADD8",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Java: "#ED8B00",
  "C#": "#9B4F96",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89e051",
};

function RepoCard({ repo, idx }) {
  const color = LANG_COLORS[repo.language] || "#00F5C4";
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: idx * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-5 backdrop-blur-sm transition-colors duration-500 hover:border-[color:var(--card-accent)]/60"
      style={{ "--card-accent": color }}
    >
      <div
        className="absolute -right-14 -top-14 size-36 rounded-full opacity-[0.05] blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: color }}
      />
      <div className="relative">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-mono text-sm font-semibold tracking-tight text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
            {repo.name}
          </h3>
          <ArrowUpRight className="size-4 shrink-0 text-[var(--color-text-muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]" />
        </div>
        <p className="mb-5 line-clamp-3 min-h-[3rem] text-xs leading-relaxed text-[var(--color-text-muted)]">
          {repo.description || "No description provided."}
        </p>
        <div className="flex items-center gap-4 font-mono text-[11px] text-[var(--color-text-muted)]">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="size-3" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="size-3" />
            {repo.forks_count}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/40"
        />
      ))}
    </div>
  );
}

export default function GitHub() {
  const profile = useGitHubProfile(githubUsername);
  const repos = useGitHubRepos(githubUsername, 4);

  return (
    <SectionWrapper
      id="github"
      label="05 · GitHub"
      title="Code I've published publicly."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-5 backdrop-blur-sm sm:mb-12 sm:p-6"
      >
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
            <GithubIcon className="size-5" />
          </span>
          <div>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="block font-mono text-base font-semibold text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
            >
              @{githubUsername}
            </a>
            <div className="font-mono text-xs text-[var(--color-text-muted)]">
              {profile.loading
                ? "fetching profile…"
                : profile.data
                  ? `${profile.data.public_repos ?? 0} public repos · ${profile.data.followers ?? 0} followers`
                  : "profile unavailable"}
            </div>
          </div>
        </div>
        <a
          href={personal.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/60 bg-[var(--color-accent-dim)] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]"
        >
          Follow
          <ArrowUpRight className="size-3.5" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-5 backdrop-blur-sm sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
            contribution graph
          </h3>
          <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
            past year
          </span>
        </div>
        <div className="overflow-x-auto">
          <img
            src={`https://ghchart.rshah.org/00F5C4/${githubUsername}`}
            alt={`${githubUsername} GitHub contributions`}
            loading="lazy"
            className="min-w-[640px] opacity-95"
            style={{ filter: "brightness(0.95) contrast(1.05)" }}
          />
        </div>
      </motion.div>

      <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
        top repositories
      </h3>

      {repos.loading && <Skeleton />}
      {repos.error && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-6 text-sm text-[var(--color-text-muted)]">
          <AlertCircle className="size-4 text-[var(--color-rust)]" />
          Couldn&apos;t reach GitHub right now.
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="ml-2 text-[var(--color-accent)] underline underline-offset-4"
          >
            Visit profile →
          </a>
        </div>
      )}
      {!repos.loading && !repos.error && repos.data.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {repos.data.map((r, i) => (
            <RepoCard key={r.id} repo={r} idx={i} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

import { useEffect, useState } from "react";

const GITHUB_API = "https://api.github.com";
const CACHE_TTL = 60 * 60 * 1000;

function readCache(key) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({ data, ts: Date.now() }),
    );
  } catch {
    /* ignore quota issues */
  }
}

export function useGitHubRepos(username, limit = 6) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    if (!username) return;
    const cacheKey = `gh_repos_${username}`;
    const cached = readCache(cacheKey);
    if (cached) {
      setState({ loading: false, error: null, data: cached });
      return;
    }

    let active = true;
    (async () => {
      try {
        const res = await fetch(
          `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=${limit * 2}`,
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const json = await res.json();
        const top = json
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at) - new Date(a.pushed_at),
          )
          .slice(0, limit);
        writeCache(cacheKey, top);
        if (active) setState({ loading: false, error: null, data: top });
      } catch (err) {
        if (active)
          setState({ loading: false, error: err.message, data: [] });
      }
    })();

    return () => {
      active = false;
    };
  }, [username, limit]);

  return state;
}

export function useGitHubProfile(username) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!username) return;
    const cacheKey = `gh_profile_${username}`;
    const cached = readCache(cacheKey);
    if (cached) {
      setState({ loading: false, error: null, data: cached });
      return;
    }

    let active = true;
    (async () => {
      try {
        const res = await fetch(`${GITHUB_API}/users/${username}`);
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const json = await res.json();
        writeCache(cacheKey, json);
        if (active) setState({ loading: false, error: null, data: json });
      } catch (err) {
        if (active)
          setState({ loading: false, error: err.message, data: null });
      }
    })();

    return () => {
      active = false;
    };
  }, [username]);

  return state;
}

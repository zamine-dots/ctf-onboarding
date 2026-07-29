import { useCallback, useEffect, useMemo, useState } from "react";

export interface Profile {
  callsign: string;
  createdAt: string;
  completed: Record<string, string>; // challengeId -> ISO timestamp completed
}

const ROSTER_KEY = "sz:roster";
const ACTIVE_KEY = "sz:active";
const profileKey = (callsign: string) => `sz:profile:${callsign.toLowerCase()}`;

function loadRoster(): string[] {
  try {
    const raw = localStorage.getItem(ROSTER_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRoster(roster: string[]) {
  localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
}

function loadProfile(callsign: string): Profile | null {
  try {
    const raw = localStorage.getItem(profileKey(callsign));
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: Profile) {
  localStorage.setItem(profileKey(profile.callsign), JSON.stringify(profile));
}

export function useProfile() {
  const [activeCallsign, setActiveCallsign] = useState<string | null>(() => {
    try {
      return localStorage.getItem(ACTIVE_KEY);
    } catch {
      return null;
    }
  });
  const [roster, setRoster] = useState<string[]>(() => loadRoster());
  const [profile, setProfile] = useState<Profile | null>(() => {
    const active = (() => {
      try {
        return localStorage.getItem(ACTIVE_KEY);
      } catch {
        return null;
      }
    })();
    return active ? loadProfile(active) : null;
  });

  useEffect(() => {
    if (activeCallsign) {
      setProfile(loadProfile(activeCallsign));
      try {
        localStorage.setItem(ACTIVE_KEY, activeCallsign);
      } catch {
        /* ignore quota errors */
      }
    } else {
      setProfile(null);
    }
  }, [activeCallsign]);

  const createOrSwitch = useCallback((rawCallsign: string) => {
    const callsign = rawCallsign.trim();
    if (!callsign) return;
    let existing = loadProfile(callsign);
    if (!existing) {
      existing = { callsign, createdAt: new Date().toISOString(), completed: {} };
      saveProfile(existing);
    }
    setRoster((prev) => {
      if (prev.some((c) => c.toLowerCase() === callsign.toLowerCase())) return prev;
      const next = [...prev, callsign];
      saveRoster(next);
      return next;
    });
    setActiveCallsign(callsign);
  }, []);

  const signOut = useCallback(() => {
    setActiveCallsign(null);
    try {
      localStorage.removeItem(ACTIVE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleChallenge = useCallback(
    (challengeId: string) => {
      if (!activeCallsign) return;
      setProfile((prev) => {
        const base: Profile = prev ?? {
          callsign: activeCallsign,
          createdAt: new Date().toISOString(),
          completed: {},
        };
        const completed = { ...base.completed };
        if (completed[challengeId]) {
          delete completed[challengeId];
        } else {
          completed[challengeId] = new Date().toISOString();
        }
        const next = { ...base, completed };
        saveProfile(next);
        return next;
      });
    },
    [activeCallsign]
  );

  const resetProgress = useCallback(() => {
    if (!activeCallsign) return;
    const next: Profile = { callsign: activeCallsign, createdAt: new Date().toISOString(), completed: {} };
    saveProfile(next);
    setProfile(next);
  }, [activeCallsign]);

  const exportProgress = useCallback(() => {
    if (!profile) return;
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sector-zero_${profile.callsign.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [profile]);

  const importProgress = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Profile;
        if (!parsed.callsign || typeof parsed.completed !== "object") return;
        saveProfile(parsed);
        setRoster((prev) => {
          if (prev.some((c) => c.toLowerCase() === parsed.callsign.toLowerCase())) return prev;
          const next = [...prev, parsed.callsign];
          saveRoster(next);
          return next;
        });
        setActiveCallsign(parsed.callsign);
      } catch {
        /* invalid file, ignore */
      }
    };
    reader.readAsText(file);
  }, []);

  const isComplete = useCallback((challengeId: string) => Boolean(profile?.completed?.[challengeId]), [profile]);

  return useMemo(
    () => ({
      profile,
      roster,
      activeCallsign,
      createOrSwitch,
      signOut,
      toggleChallenge,
      resetProgress,
      exportProgress,
      importProgress,
      isComplete,
    }),
    [profile, roster, activeCallsign, createOrSwitch, signOut, toggleChallenge, resetProgress, exportProgress, importProgress, isComplete]
  );
}
